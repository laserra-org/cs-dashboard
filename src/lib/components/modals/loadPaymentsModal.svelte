<script>
    import { getContext } from 'svelte';
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from '$lib/components/atoms';
    import { Table } from '$lib/components/molecules';
    import { createPayments } from '$lib/api/payments'; //
    import { modalData } from '$lib/stores';
    import { isAuthenticated } from '$lib/auth';
    import { closeModal } from '$lib/modal.js';
    import Papa from 'papaparse';

    let token = isAuthenticated();
    let parentData;
    let isLoading = false;
    let file = '';
    let items;


    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    const handleFileUpload = (event) => {
        file = event.target.files[0];
    };

    const parseCSV = () => {
        try {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    items = result.data;
                    loaded = true;
                },
            });
        } catch (error) {
            alert('Error parsing CSV: ' + error.message);
        }
    };

    async function handleSubmit() {
        try {
            const activeDomain = localStorage.getItem('activeDomain')
            const body = items.map(obj => {
                return {
                    domain: activeDomain,
                    label: obj.label,
                    is_active: true,        
                    type: obj.type,
                    due_date: obj.due_date,
                    amount: obj.amount,
                    currency: obj.currency,
                    settled: obj.settled,
                    agreement: parentData.agreementId,
                }
            })
            const responseData = await createPayments({'token': token}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Payment scheme</div>
    <div class="sm:col-span-2 flex flex-row justify-items-start items-center text-base">
        <input type="file" accept=".csv" on:change={handleFileUpload} />
        <Button type="primary" on:click={parseCSV}>Parse</Button>
    </div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2 text-base">
            <div class="sm:col-span-2 flex flex-col max-h-96 overflow-auto">
                {#if items}
                    <Table {isLoading}>
                        <TableHead>
                            {#each Object.keys(items[0]) as colName}
                                <TableHeadCell>
                                    {colName}</TableHeadCell>
                            {/each}
                        </TableHead>
                        <TableBody>
                            {#each items as row}
                                <TableBodyRow>
                                    {#each Object.keys(items[0]) as col}
                                        <TableBodyCell>
                                            {row[col]}
                                        </TableBodyCell>
                                    {/each}
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                {:else}
                    <div class="flex p-6 font-normal"><pre>Payment preview</pre></div>
                {/if}
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Create Payment scheme</Button>
            </div>
        </div>
    </form>
</div>

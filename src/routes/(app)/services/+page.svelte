<script>
    import { onMount } from "svelte";
    import { Page, Card, Modal } from "$lib/components/layout";
    import { toggleModal } from "$lib/modal.js";
    import { Table, TableHeader, TableFooter } from "$lib/components/molecules";
    import {
        TableBody,
        TableBodyRow,
        TableBodyCell,
        TableHead,
        TableHeadCell,
        Icon,
        Button,
    } from "$lib/components/atoms";
    import { getServiceList, updateService } from "$lib/api/services";
    import {
        createServiceModal,
        updateServiceModal,
    } from "$lib/components/modals";
    import { modalData } from "$lib/stores";

    let isLoading = true;
    let res;
    let showModal;
    let modalContent;

    modalData.subscribe((value) => {
        showModal = value.open;
        modalContent = value.content;
    });

    onMount(async () => {
        const params = {};
        const response = await getServiceList({}, params);
        res = await response.json();
        isLoading = false;
    });

</script>

<Page>
    <svelte:fragment slot="header">Services</svelte:fragment>
    <svelte:fragment slot="main"
        ><Card>
            <TableHeader>
                <svelte:fragment slot="tableheader-start"></svelte:fragment>
                <svelte:fragment slot="tableheader-end">
                    <Button
                        on:click={() =>
                            toggleModal(showModal, createServiceModal, {
                                type: "Service",
                            })}>Create Service</Button
                    >
                    {#if showModal}
                        <Modal {modalContent} />
                    {/if}</svelte:fragment
                >
            </TableHeader>
            <Table {isLoading}>
            <TableHead>
                {#each ['Name', 'Type', 'Duration', ''] as colName}
                    <TableHeadCell>
                        {colName}</TableHeadCell>
                {/each}
            </TableHead>


            <TableBody>
                {#each res.data as row}
                    <TableBodyRow>
                        <TableBodyCell>
                            {row['name']}
                        </TableBodyCell>
                        {#each ['type','duration'] as col}
                            <TableBodyCell>
                                {row[col]}
                            </TableBodyCell>
                        {/each}
                        <TableBodyCell align="right">
                                <Button
                                    type="secondary"
                                    icon
                                    on:click={() =>
                                        toggleModal(showModal, updateServiceModal, {
                                            type: 'service',
                                            id: row['id'],
                                        })}>
                                    <Icon name="edit" size="24" />
                                </Button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
            </Table>
        </Card>
    </svelte:fragment>
</Page>

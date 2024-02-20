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
    import { getLocationList, updateLocation } from "$lib/api/locations";
    import {
        createLocationModal,
        updateLocationModal,
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
        const response = await getLocationList({}, params);
        res = await response.json();
        isLoading = false;
    });

</script>

<Page>
    <svelte:fragment slot="header">Locations</svelte:fragment>
    <svelte:fragment slot="main"
        ><Card>
            <TableHeader>
                <svelte:fragment slot="tableheader-start"></svelte:fragment>
                <svelte:fragment slot="tableheader-end">
                    <Button
                        on:click={() =>
                            toggleModal(showModal, createLocationModal, {
                                type: "location",
                            })}>Create Location</Button
                    >
                    {#if showModal}
                        <Modal {modalContent} />
                    {/if}</svelte:fragment
                >
            </TableHeader>
            <Table {isLoading}>
            <TableHead>
                {#each ['Name', 'Timezone', 'Resource selection strategy', ''] as colName}
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
                        {#each ['time_zone','resource_selection_strategy'] as col}
                            <TableBodyCell>
                                {row[col]}
                            </TableBodyCell>
                        {/each}
                        <TableBodyCell align="right">
                                <Button
                                    type="secondary"
                                    icon
                                    on:click={() =>
                                        toggleModal(showModal, updateLocationModal, {
                                            type: 'location',
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

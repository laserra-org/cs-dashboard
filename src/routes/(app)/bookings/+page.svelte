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
    import { getBookingList } from "$lib/api/bookings";
    import { deleteBookingModal } from "$lib/components/modals";
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
        const params = {
            disabled: "include",
        };
        const response = await getBookingList({}, params);
        res = await response.json();
        isLoading = false;
    });
</script>

<Page>
    <svelte:fragment slot="header">Bookings</svelte:fragment>
    <svelte:fragment slot="main"
        ><Card>
            <TableHeader>
                <svelte:fragment slot="tableheader-start">
                    {#if showModal}
                        <Modal {modalContent} />
                    {/if}</svelte:fragment
                >
            </TableHeader>
            <Table {isLoading}>
                <TableHead>
                    {#each ["Utente", "Servizio", "Risorsa", "Data", "Inizia", "Finisce", ""] as colName}
                        <TableHeadCell>
                            {colName}</TableHeadCell
                        >
                    {/each}
                </TableHead>

                <TableBody>
                    {#each res.data as row}
                        <TableBodyRow>
                            <TableBodyCell>
                                {row.metadata.user}
                            </TableBodyCell>
                            <TableBodyCell>
                                {row.service.name}
                            </TableBodyCell>
                            <TableBodyCell>
                                {row.resource.name}
                            </TableBodyCell>
                            <TableBodyCell>
                                {row.starts_at.substring(0, 10)}
                            </TableBodyCell>
                            <TableBodyCell>
                                {row.starts_at.substring(11, 16)}
                            </TableBodyCell>
                            <TableBodyCell>
                                {row.ends_at.substring(11, 16)}
                            </TableBodyCell>
                            <TableBodyCell align="right">
                                <Button
                                    type="secondary"
                                    icon
                                    on:click={() =>
                                        toggleModal(
                                            showModal,
                                            deleteBookingModal,
                                            {
                                                type: "booking",
                                                id: row.id,
                                            },
                                        )}
                                >
                                    <Icon name="delete" size="24" />
                                </Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        </Card>
    </svelte:fragment>
</Page>

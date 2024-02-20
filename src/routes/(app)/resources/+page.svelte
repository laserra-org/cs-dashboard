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
    import { getResourceList, updateResource } from "$lib/api/resources";
    import {
        createResourceModal,
        updateResourceModal,
    } from "$lib/components/modals";
    import { modalData } from "$lib/stores";
    import { page } from '$app/stores';

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
        const response = await getResourceList({}, params);
        res = await response.json();
        isLoading = false;
    });
</script>

<Page>
    <svelte:fragment slot="header">Resources</svelte:fragment>
    <svelte:fragment slot="main"
        ><Card>
            <TableHeader>
                <svelte:fragment slot="tableheader-start"></svelte:fragment>
                <svelte:fragment slot="tableheader-end">
                    <Button
                        on:click={() =>
                            toggleModal(showModal, createResourceModal, {
                                type: "resource",
                            })}>Create Resource</Button
                    >
                    {#if showModal}
                        <Modal {modalContent} />
                    {/if}</svelte:fragment
                >
            </TableHeader>
            <Table {isLoading}>
                <TableHead>
                    {#each ["Name", "Max simultaneous bookings", "Enabled", ""] as colName}
                        <TableHeadCell>
                            {colName}</TableHeadCell
                        >
                    {/each}
                </TableHead>

                <TableBody>
                    {#each res.data as row}
                        <TableBodyRow>
                            <TableBodyCell>
                                <a href={$page.url.pathname + "/" + row["id"]}>
                                    {row["name"]}
                                </a>
                            </TableBodyCell>
                            {#each ["max_simultaneous_bookings", "enabled"] as col}
                                <TableBodyCell>
                                    {row[col]}
                                </TableBodyCell>
                            {/each}
                            <TableBodyCell align="right">
                                <Button
                                    type="secondary"
                                    icon
                                    on:click={() =>
                                        toggleModal(
                                            showModal,
                                            updateResourceModal,
                                            {
                                                type: "location",
                                                id: row["id"],
                                            },
                                        )}
                                >
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

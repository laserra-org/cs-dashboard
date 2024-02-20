<script>
    export let data;
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
    import {
        getScheduleBlockList,
        updateScheduleBlock,
    } from "$lib/api/schedule_blocks";
    import {
        createScheduleBlockModal,
        updateScheduleBlockModal,
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
        const params = {
            resource: data.obj.id,
            disabled: "include",
        };
        const response = await getScheduleBlockList({}, params);
        res = await response.json();
        isLoading = false;
    });
</script>

<Card>
    <TableHeader>
        <svelte:fragment slot="tableheader-start"></svelte:fragment>
        <svelte:fragment slot="tableheader-end">
            <Button
                on:click={() =>
                    toggleModal(showModal, createScheduleBlockModal, {
                        type: "schedule_block",
                    })}>Create Schedule Block</Button
            >
            {#if showModal}
                <Modal {modalContent} />
            {/if}</svelte:fragment
        >
    </TableHeader>
    <Table {isLoading}>
        <TableHead>
            {#each ["Location", "Starts", "Ends", "Available", ""] as colName}
                <TableHeadCell>
                    {colName}</TableHeadCell
                >
            {/each}
        </TableHead>

        <TableBody>
            {#each res.data as row}
                <TableBodyRow>
                    <TableBodyCell>
                        {row["id"]}
                    </TableBodyCell>
                    {#each ["location_id", "starts_at", "ends_at", "is_available"] as col}
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
                                    updateScheduleBlockModal,
                                    {
                                        type: "schedule_block",
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

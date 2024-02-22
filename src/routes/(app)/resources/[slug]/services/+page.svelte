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
        getResourceServiceList
    } from "$lib/api/resource_services";
    import {
        createResourceServiceModal,
        deleteResourceServiceModal,
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
        const response = await getResourceServiceList({}, params);
        res = await response.json();
        isLoading = false;
    });

    console.log(data.obj)

</script>

<Card>
    <TableHeader>
        <svelte:fragment slot="tableheader-start"></svelte:fragment>
        <svelte:fragment slot="tableheader-end">
            <Button
                on:click={() =>
                    toggleModal(showModal, createResourceServiceModal, {
                        type: "resource_service", obj: data.obj
                    })}>Link Service</Button
            >
            {#if showModal}
                <Modal {modalContent} />
            {/if}</svelte:fragment
        >
    </TableHeader>
    <Table {isLoading}>
        <TableHead>
            {#each ["Service", ""] as colName}
                <TableHeadCell>
                    {colName}</TableHeadCell
                >
            {/each}
        </TableHead>

        <TableBody>
            {#each res as row}
                <TableBodyRow>
                    <TableBodyCell>
                        {row.service_id}
                    </TableBodyCell>
                    <TableBodyCell align="right">
                        <Button
                            type="secondary"
                            icon
                            on:click={() =>
                                toggleModal(
                                    showModal,
                                    deleteResourceServiceModal,
                                    {
                                        type: "schedule_block",
                                        resource_id: data.obj.id,
                                        service_id: row["service_id"],
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

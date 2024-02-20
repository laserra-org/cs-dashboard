<script>
    /** @type {import('./$types').PageData} */
    import { page } from '$app/stores';  
    export let data;
    import { toggleModal } from "$lib/modal.js";
    import { Page, Card, PageTitle, Modal } from "$lib/components/layout";
    import { Table, TableHeader, TableFooter } from "$lib/components/molecules";
    import {
        Label,
        Input,
        Checkbox,
        BoxList,
        BoxListItem,
        Button,
        TableHead,
        TableBody,
        TableBodyRow,
        TableBodyCell,
        TableHeadCell,
        Icon,
    } from "$lib/components/atoms";
    import { modalData } from "$lib/stores";
    import { onMount } from "svelte";
</script>

<Card>
    <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
        <div class="flex flex-col">
            <Label>Name</Label>
            <Input
                disabled
                type="text"
                id="label"
                placeholder="Enter resource name"
                required
                bind:value={data.obj.name}
            />
        </div>
        <div class="flex flex-col">
            <Label>Max simultaneous bookings</Label>
            <Input
                disabled
                type="number"
                id="number"
                placeholder="max bookings"
                name="bookings"
                step="1"
                min="1"
                bind:value={data.obj.max_simultaneous_bookings}
            />
        </div>
        <div class="flex flex-col">
            <Label>Enabled</Label>
            <Checkbox
                disabled
                id="enabled"
                checked={data.obj.enabled}
            />
        </div>
    </div>
</Card>
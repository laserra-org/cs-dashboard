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

    console.log(data.obj);
    console.log($page.url.pathname)
</script>

<Page>
    <svelte:fragment slot="header"
        ><PageTitle
            >{data.obj.name}
            <svelte:fragment slot="header-right"></svelte:fragment></PageTitle
        ></svelte:fragment
    >
    <svelte:fragment slot="sidebarLeft">
        <div class="flex flex-col">
            <div class="text-2xl font-medium px-8 py-4"><a href={$page.url.pathname + '/schedule_blocks'}>Schedule Blocks</a></div>
            <div class="text-2xl font-medium px-8 py-4"><a href={$page.url.pathname + '/recurring_schedules'}>Recurring Schedules</a></div>
            <div class="text-2xl font-medium px-8 py-4"><a href={$page.url.pathname + '/services'}>Services</a></div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="main"
        ><Card>
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
        </Card></svelte:fragment
    >
    <svelte:fragment slot="sidebarRight"></svelte:fragment>
</Page>

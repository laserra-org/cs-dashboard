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

<Page>
    <svelte:fragment slot="header"
        ><PageTitle
            >{data.obj.name}
            <svelte:fragment slot="header-right"></svelte:fragment></PageTitle
        ></svelte:fragment
    >
    <svelte:fragment slot="sidebarLeft">
        <div class="flex flex-col">
            <div class="text-2xl font-medium px-8 py-4"><a href={'/resources/' + data.obj.id + '/schedule_blocks'}>Schedule Blocks</a></div>
            <div class="text-2xl font-medium px-8 py-4"><a href={'/resources/' + data.obj.id + '/recurring_schedules'}>Recurring Schedules</a></div>
            <div class="text-2xl font-medium px-8 py-4"><a href={'/resources/' + data.obj.id + '/services'}>Services</a></div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="main"
        ><slot></slot></svelte:fragment
    >
    <svelte:fragment slot="sidebarRight"></svelte:fragment>
</Page>

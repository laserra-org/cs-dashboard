<script>
        import { onMount } from 'svelte';
    import { Page, Card, Modal } from '$lib/components/layout';
    import { toggleModal } from '$lib/modal.js';
    import { Table, TableHeader, TableFooter } from '$lib/components/molecules';
    import {
        TableBody,
        TableBodyRow,
        TableBodyCell,
        TableHead,
        TableHeadCell,
        Icon,
        Button,
    } from '$lib/components/atoms';
    import { getServiceList, updateService } from '$lib/api/services';
    import { createServiceModal, updateServiceModal } from '$lib/components/modals';

    let isLoading = true;
    let includeDeletedItems = false;
    let res;
    let showModal;
    let modalContent;
    let agreementType = { value: 'LEASING', name: 'Leasing' };
    let tablePage = 1;

onMount(async () => {
        const params = {

        };
        const response = await getServiceList({ }, params);
        res = await response.json();
        isLoading = false;
    });

async function updateTable() {
        isLoading = true;
        const params = {
            domain: localStorage.getItem('activeDomain'),
            includeDeleted: includeDeletedItems,
            page: tablePage,
            type: agreementType.value,
        };
        const response = await getServiceList({  }, params);
        res = await response.json();
        isLoading = false;
    }

</script>

<Page>
<Button
                        on:click={() =>
                            toggleModal(showModal, createServiceModal, {})}>Create Leasing</Button>
                    {#if showModal}
                        <Modal {modalContent} />
                    {/if}
            
</Page>
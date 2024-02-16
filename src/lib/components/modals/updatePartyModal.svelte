<script>
    import { Input, Label, Select, Button, Textarea } from '$lib/components/atoms';
    import { getParty, updateParty } from '$lib/api/parties'; //
    import { modalData } from '$lib/stores';
    import { isAuthenticated } from '$lib/auth';
    import { closeModal } from '$lib/modal.js';
    import { onMount } from 'svelte';

    let token = isAuthenticated();
    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        label: '',
        type: '', 
        notes: ''
    };

    onMount(async () => {
            const response = await getParty({'token':token}, {'id': parentData.id});
            formData.label = response.label;
            formData.type = response.type;
            formData.notes = response.notes;
            isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                domain: localStorage.getItem('activeDomain'),
                label: formData.label,
                type: formData.type,
                is_active: true,
                type: formData.type,
                notes: formData.notes
            };
            const responseData = await updateParty({'token':token}, {'id': parentData.id}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let party_types = [
        { value: 'PERSON', name: 'Person' },
        { value: 'COMPANY', name: 'Company' },
        { value: 'ORGANIZATION', name: 'Organization' },
    ];
</script>

<div>
    <div class="font-bold text-3xl pb-2">Update Party</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label
                    >Name</Label>
                    <Input
                        type="text"
                        id="label"
                        placeholder="Enter party name"
                        required
                        bind:value={formData.label} />
            </div>
            <div class="flex flex-col">
                <Label>Party Type</Label>
                <Select items={party_types} bind:value={formData.type} />
            </div>
            <div class="sm:col-span-2 flex flex-col">
                <Label
                    >Notes</Label>
                    <Textarea
                        id="notes"
                        placeholder="Your notes here"
                        name="notes"
                        bind:value={formData.notes} />
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Update Party</Button>
            </div>
        </div>
    </form>
</div>


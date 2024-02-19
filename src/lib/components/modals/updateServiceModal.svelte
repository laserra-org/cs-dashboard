<script>
    import { Input, Label, Select, Button, Textarea, Spinner } from '$lib/components/atoms';
    import { getService, updateService } from '$lib/api/services'; //
    import { modalData } from '$lib/stores';
    import { closeModal } from '$lib/modal.js';
    import { onMount } from 'svelte';

    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        label: '',
        notes: ''
    };

    onMount(async () => {
            const response = await getService({}, {'id': parentData.id});
            formData.name = response.name;
            formData.type = response.type;
            isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                type: formData.type,
            };
            const responseData = await updateService({}, {'id': parentData.id}, body);
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

</script>

{#if isLoading}
<Spinner></Spinner>
{:else}
<div>
    <div class="font-bold text-3xl pb-2">Update Service: {formData.name}</div>
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
                        bind:value={formData.name} />
            </div>
            <div class="sm:col-span-2 flex flex-col">
                <Label
                    >Type</Label>
                    <Textarea
                        id="notes"
                        placeholder="Your notes here"
                        name="notes"
                        bind:value={formData.type} />
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Update Service</Button>
            </div>
        </div>
    </form>
</div>
{/if}

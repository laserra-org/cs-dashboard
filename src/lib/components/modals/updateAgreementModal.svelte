<script>
    import { Input, Label, Select, Button, Textarea, Spinner } from '$lib/components/atoms';
    import { getAgreement, updateAgreement } from '$lib/api/agreements'; //
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
        notes: ''
    };

    onMount(async () => {
            const response = await getAgreement({'token':token}, {'id': parentData.id});
            formData.label = response.label;
            formData.notes = response.notes;
            isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                label: formData.label,
                notes: formData.notes,
            };
            const responseData = await updateAgreement({'token':token}, {'id': parentData.id}, body);
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
    <div class="font-bold text-3xl pb-2">Update {parentData.type.name}</div>
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
                <Button type="primary">Update {parentData.type.name}</Button>
            </div>
        </div>
    </form>
</div>
{/if}

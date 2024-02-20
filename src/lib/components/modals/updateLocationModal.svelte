<script>
    import { Input, Label, Select, Button, Textarea, Spinner, Checkbox } from '$lib/components/atoms';
    import { getLocation, updateLocation } from '$lib/api/locations'; //
    import { modalData } from '$lib/stores';
    import { closeModal } from '$lib/modal.js';
    import { onMount } from 'svelte';

    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: '',
        time_zone: '',
        resource_selection_strategy: '',
        resource_selection_priority: '',
        metadata: '',
        protected_metadata: '',
        enabled: null,
    };

    onMount(async () => {
            const response = await getLocation({}, {'id': parentData.id});
            formData.name = response.name;
            formData.time_zone = response.time_zone;
            formData.resource_selection_strategy = response.resource_selection_strategy;
            formData.resource_selection_priority = response.resource_selection_priority;
            formData.metadata = response.metadata;
            formData.protected_metadata = response.protected_metadata;
            formData.enabled = response.enabled;
            isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                time_zone: formData.time_zone,
                resource_selection_strategy: formData.resource_selection_strategy,
                resource_selection_priority: formData.resource_selection_priority,
                metadata: formData.metadata,
                protected_metadata: formData.protected_metadata,
                enabled: formData.enabled,
            };
            const responseData = await updateLocation({}, {'id': parentData.id}, body);
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let strategies = [
        { value: "randomize", name: "Randomizza" },
        { value: "prioritize", name: "Prioritizza" },
        { value: "equalize", name: "Equalizza" },
    ];

</script>

{#if isLoading}
<Spinner></Spinner>
{:else}
<div>
    <div class="font-bold text-3xl pb-2">Update location: {formData.name}</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label>Name</Label>
                <Input
                    type="text"
                    id="label"
                    placeholder="La tua location"
                    required
                    bind:value={formData.name}
                />
            </div>
            <div class="flex flex-col">
                <Label>Timezone</Label>
                <Input
                    type="text"
                    id="timezone"
                    placeholder="Il tuo fuso orario"
                    required
                    bind:value={formData.time_zone}
                />
            </div>
            <div class="flex flex-col">
                <Label>Res. Sel. Strategy</Label>
                <Select
                    items={strategies}
                    bind:value={formData.resource_selection_strategy}
                />
            </div>
            <div class="flex flex-col">
                <Label>Res. Sel. Priority</Label>
                <Input
                    type="text"
                    id="priority"
                    placeholder="array di UUID"
                    bind:value={formData.resource_selection_priority}
                />
            </div>
            <div class="flex flex-col">
                <Label>Enabled</Label>
                <Checkbox id="enabled" bind:checked={formData.enabled} />
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Update Location</Button>
            </div>
        </div>
    </form>
</div>
{/if}

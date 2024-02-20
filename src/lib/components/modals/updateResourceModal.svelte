<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Spinner,
        Checkbox,
    } from "$lib/components/atoms";
    import { getResource, updateResource } from "$lib/api/resources"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";
    import { onMount } from "svelte";

    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: "",
        max_simultaneous_bookings: 1,
        metadata: "",
        protected_metadata: "",
        enabled: null,
    };

    onMount(async () => {
        const response = await getResource({}, { id: parentData.id });
        formData.name = response.name;
        formData.max_simultaneous_bookings = response.max_simultaneous_bookings;
        formData.metadata = response.metadata;
        formData.protected_metadata = response.protected_metadata;
        formData.enabled = response.enabled;
        isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                max_simultaneous_bookings: formData.max_simultaneous_bookings,
                metadata: formData.metadata,
                protected_metadata: formData.protected_metadata,
                enabled: formData.enabled,
            };
            const responseData = await updateResource(
                {},
                { id: parentData.id },
                body,
            );
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

{#if isLoading}
    <Spinner></Spinner>
{:else}
    <div>
        <div class="font-bold text-3xl pb-2">
            Update resource: {formData.name}
        </div>
        <form on:submit={handleSubmit}>
            <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                <div class="flex flex-col">
                    <Label>Name</Label>
                    <Input
                        type="text"
                        id="label"
                        placeholder="Enter resource name"
                        required
                        bind:value={formData.name}
                    />
                </div>
                <div class="flex flex-col">
                    <Label>Max simultaneous bookings</Label>
                    <Input
                        type="number"
                        id="number"
                        placeholder="max bookings"
                        name="bookings"
                        step="1"
                        min="1"
                        bind:value={formData.max_simultaneous_bookings}
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
                        }}>Close</Button
                    >
                    <Button type="primary">Update Resource</Button>
                </div>
            </div>
        </form>
    </div>
{/if}

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
    import { getScheduleBlock, updateScheduleBlock } from "$lib/api/schedule_blocks"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";
    import { onMount } from "svelte";

    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

console.log(parentData);

    let formData = {
        location_id: "",
        starts_at: "",
        ends_at: "",
        is_available: null,
    };

    onMount(async () => {
        const response = await getScheduleBlock({}, { resource: parentData.resource_id, id: parentData.id });
        formData.location_id = response.location.id;
        formData.starts_at = response.starts_at;
        formData.ends_at = response.ends_at;
        formData.is_available = response.is_available;
        isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                location_id: formData.location_id,
                starts_at: formData.starts_at,
                ends_at: formData.ends_at,
                is_available: formData.is_available,
            };
            const responseData = await updateScheduleBlock(
                {},
                { resource: parentData.resource_id, id: parentData.id },
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
            Update Service: {formData.name}
        </div>
        <form on:submit={handleSubmit}>
            <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                <div class="flex flex-col">
                    <Label>Location</Label>
                    <Input
                        type="text"
                        id="location"
                        placeholder="location"
                        required
                        bind:value={formData.location_id}
                    />
                </div>
                <div class="flex flex-col">
                    <Label>Is Available</Label>
                    <Checkbox id="enabled" bind:checked={formData.is_available} />
                </div>
                <div class="flex flex-col">
                    <Label>Starts</Label>
                    <Input
                        type="text"
                        id="starts"
                        placeholder="Starts at"
                        required
                        bind:value={formData.starts_at}
                    />
                </div>
                <div class="flex flex-col">
                    <Label>Ends</Label>
                    <Input
                        type="text"
                        id="ends"
                        placeholder="Ends at"
                        required
                        bind:value={formData.ends_at}
                    />
                </div>
                <div class="sm:col-span-2 flex w-full justify-between py-4">
                    <Button
                        type="secondary"
                        on:click={(event) => {
                            event.preventDefault();
                            closeModal();
                        }}>Close</Button
                    >
                    <Button type="primary">Update Schedule Block</Button>
                </div>
            </div>
        </form>
    </div>
{/if}

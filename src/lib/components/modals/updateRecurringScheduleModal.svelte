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
    import { getRecurringSchedule, updateRecurringSchedule } from "$lib/api/recurring_schedules"; //
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
        start_date: "",
        end_date: "",
        interval: null,
    };

    onMount(async () => {
        const response = await getRecurringSchedule({}, { resource: parentData.resource_id, id: parentData.id });
        formData.location_id = response.location.id;
        formData.start_date = response.start_date;
        formData.end_date = response.end_date;
        formData.interval = response.interval;
        isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                location_id: formData.location_id,
                start_date: formData.start_date,
                end_date: formData.end_date,
                interval: formData.interval,
            };
            const responseData = await updateRecurringSchedule(
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
            Update Recurring Schedule: {formData.name}
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
                    <Label>Interval (weeks)</Label>
                    <Input
                        type="number"
                        id="number"
                        placeholder="interval"
                        name="interval"
                        step="1"
                        min="1"
                        bind:value={formData.interval}
                    />
                </div>
                <div class="flex flex-col">
                    <Label>Starts</Label>
                    <Input
                        type="text"
                        id="starts"
                        placeholder="YYYY-MM-DD"
                        required
                        bind:value={formData.start_date}
                    />
                </div>
                <div class="flex flex-col">
                    <Label>Ends</Label>
                    <Input
                        type="text"
                        id="ends"
                        placeholder="YYYY-MM-DD"
                        required
                        bind:value={formData.end_date}
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
                    <Button type="primary">Update Recurring Schedule</Button>
                </div>
            </div>
        </form>
    </div>
{/if}

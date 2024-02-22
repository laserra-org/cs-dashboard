<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { createRecurringSchedule } from "$lib/api/recurring_schedules"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        location_id: "c84065c5-c565-4310-8119-6a0c0707b9ba",
        start_date: "",
        end_date: "",
        interval: 1,
    };

    console.log(parentData);

    async function handleSubmit() {
        try {
            const params = {
                resource: parentData.obj.id,
            };
            const body = {
                location_id: formData.location_id,
                start_date: formData.start_date,
                end_date: formData.end_date,
                interval: formData.interval,
            };
            const responseData = await createRecurringSchedule(
                {},
                params,
                body,
            ); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Recurring Schedule</div>
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
                <Button type="primary">Create Recurring Schedule</Button>
            </div>
        </div>
    </form>
</div>

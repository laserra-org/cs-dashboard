<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { createScheduleBlock } from "$lib/api/schedule_blocks"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        location_id: "c84065c5-c565-4310-8119-6a0c0707b9ba",
        starts_at: "",
        ends_at: "",
        is_available: true,
    };

console.log(parentData);

    async function handleSubmit() {
        try {
            const params = {
                resource: parentData.obj.id,
            };
            const body = {
                location_id: formData.location_id,
                starts_at: formData.starts_at,
                ends_at: formData.ends_at,
                is_availabble: formData.is_available,
            };
            const responseData = await createScheduleBlock({}, params, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Schedule Block</div>
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
                <Button type="primary">Create Schedule block</Button>
            </div>
        </div>
    </form>
</div>

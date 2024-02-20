<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { createService } from "$lib/api/services"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: "",
        type: "fixed",
        duration: "PT1H",
        price: "10.000",
        bookable_interval: "",
        buffer_time_before: "PT0S",
        buffer_time_after: "PT0S",
        booking_window_start: "PT1H",
        booking_window_end: "P30D",
        cancelation_threshold: "PT1H",
        metadata: "",
        protected_metadata: "",
        enabled: true,
    };

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                type: formData.type,
                duration: formData.duration,
                price: formData.price,
                bookable_interval: formData.bookable_interval,
                buffer_time_before: formData.buffer_time_before,
                buffer_time_after: formData.buffer_time_after,
                booking_window_start: formData.booking_window_start,
                booking_window_end: formData.booking_window_end,
                cancelation_threshold: formData.cancelation_threshold,
                metadata: formData.metadata,
                protected_metadata: formData.protected_metadata,
                enabled: formData.enabled,
            };
            const responseData = await createService({}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    let serviceTypes = [
        { value: "fixed", name: "Fisso" },
        { value: "flexible", name: "Flessibile" },
        { value: "day", name: "A giornata" },
    ];
</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Service</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label>Name</Label>
                <Input
                    type="text"
                    id="label"
                    placeholder="Enter service name"
                    required
                    bind:value={formData.name}
                />
            </div>
            <div class="flex flex-col">
                <Label>Type</Label>
                <Select items={serviceTypes} bind:value={formData.type} />
            </div>
            <div class="flex flex-col">
                <Label>Duration</Label>
                <Input
                    type="text"
                    id="duration"
                    placeholder="Duration"
                    required
                    bind:value={formData.duration}
                />
            </div>
            <div class="flex flex-col">
                <Label>Price</Label>
                <Input
                    type="number"
                    step="0.001"
                    min="0"
                    id="price"
                    placeholder="price"
                    bind:value={formData.price}
                />
            </div>
            <div class="flex flex-col">
                <Label>Bookable Interval</Label>
                <Input
                    disabled
                    type="text"
                    id="bookable_interbal"
                    placeholder="Bookable Interval"
                    bind:value={formData.bookable_interval}
                />
            </div>
            <div class="flex flex-col">
                <Label>Cancelation Threshold</Label>
                <Input
                    type="text"
                    id="cancelation_threshold"
                    placeholder="cancelation_threshold"
                    bind:value={formData.cancelation_threshold}
                />
            </div>
            <div class="flex flex-col">
                <Label>Buffer Time Before</Label>
                <Input
                    type="text"
                    id="buffer_before"
                    placeholder="buffer before"
                    bind:value={formData.buffer_time_before}
                />
            </div>
            <div class="flex flex-col">
                <Label>Buffer Time After</Label>
                <Input
                    type="text"
                    id="buffer_after"
                    placeholder="buffer after"
                    bind:value={formData.buffer_time_after}
                />
            </div>
            <div class="flex flex-col">
                <Label>Booking Window Start</Label>
                <Input
                    type="text"
                    id="booking_window_start"
                    placeholder="window_start"
                    bind:value={formData.booking_window_start}
                />
            </div>
            <div class="flex flex-col">
                <Label>Booking Window End</Label>
                <Input
                    type="text"
                    id="booking_window_end"
                    placeholder="window_end"
                    bind:value={formData.booking_window_end}
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
                <Button type="primary">Create Service</Button>
            </div>
        </div>
    </form>
</div>

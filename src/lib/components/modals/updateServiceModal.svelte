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
    import { getService, updateService } from "$lib/api/services"; //
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
        type: "",
        duration: "",
        price: "",
        bookable_interval: "",
        buffer_time_before: "",
        buffer_time_after: "",
        booking_window_start: "",
        booking_window_end: "",
        cancelation_threshold: "",
        metadata: "",
        protected_metadata: "",
        enabled: null,
    };

    onMount(async () => {
        const response = await getService({}, { id: parentData.id });
        formData.name = response.name;
        formData.type = response.type;
        formData.duration = response.duration;
        formData.price = response.price;
        formData.bookable_interval = response.bookable_interval;
        formData.buffer_time_before = response.buffer_time_before;
        formData.buffer_time_after = response.buffer_time_after;
        formData.booking_window_start = response.booking_window_start;
        formData.booking_window_end = response.booking_window_end;
        formData.cancelation_threshold = response.cancelation_threshold;
        formData.metadata = response.metadata;
        formData.protected_metadata = response.protected_metadata;
        formData.enabled = response.enabled;
        isLoading = false;
    });

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
            const responseData = await updateService(
                {},
                { id: parentData.id },
                body,
            );
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
                        pattern="[0-9]{1,12}\.[0-9]{3}"
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
                    <Button type="primary">Update Service</Button>
                </div>
            </div>
        </form>
    </div>
{/if}

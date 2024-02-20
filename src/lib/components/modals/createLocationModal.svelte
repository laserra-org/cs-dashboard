<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { createLocation } from "$lib/api/locations"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: "",
        time_zone: "Europe/Rome",
        resource_selection_strategy: "randomize",
        resource_selection_priority: "",
        metadata: "",
        protected_metadata: "",
        enabled: true,
    };

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
            const responseData = await createLocation({}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    let strategies = [
        { value: "randomize", name: "Randomizza" },
        { value: "prioritize", name: "Prioritizza" },
        { value: "equalize", name: "Equalizza" },
    ];
</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Location</div>
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
                    }}>Close</Button
                >
                <Button type="primary">Create location</Button>
            </div>
        </div>
    </form>
</div>

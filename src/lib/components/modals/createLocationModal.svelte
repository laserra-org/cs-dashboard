<script>
    import { Input, Label, Select, Button, Textarea } from '$lib/components/atoms';
    import { createLocation } from '$lib/api/locations'; //
    import { modalData } from '$lib/stores';
    import { closeModal } from '$lib/modal.js';

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: 'Centro Sportivo Seriate',
        time_zone: 'Europe/Rome',
        resource_selection_strategy: 'randomize',
    };

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                time_zone: formData.time_zone,
                resource_selection_strategy: formData.resource_selection_strategy,
            };
            const responseData = await createLocation({}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }



</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Location</div>
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
                        bind:value={formData.name} />
            </div>
            <div class="flex flex-col">
                <Label
                    >Timezone</Label>
                    <Input
                        type="text"
                        id="label"
                        placeholder="Il tuo fuso orario"
                        required
                        bind:value={formData.time_zone} />
            </div>
            <div class="flex flex-col">
                <Label
                    >Notes</Label>
                    <Input
                        id="notes"
                        placeholder="Your notes here"
                        name="notes"
                        bind:value={formData.resource_selection_strategy} />
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Create location</Button>
            </div>
        </div>
    </form>
</div>

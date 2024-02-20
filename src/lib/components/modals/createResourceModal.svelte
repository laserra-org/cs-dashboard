<script>
    import { Input, Label, Select, Button, Textarea, Checkbox } from '$lib/components/atoms';
    import { createResource } from '$lib/api/resources'; //
    import { modalData } from '$lib/stores';
    import { closeModal } from '$lib/modal.js';

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        name: '',
        max_simultaneous_bookings: 1,
        metadata: '',
        protected_metadata: '',
        enabled: true
    };

    async function handleSubmit() {
        try {
            const body = {
                name: formData.name,
                max_simultaneous_bookings: formData.max_simultaneous_bookings,
                metadata: formData.metadata,
                protected_metadata: formData.protected_metadata,
                enabled: formData.enabled
            };
            const responseData = await createResource({}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }



</script>

<div>
    <div class="font-bold text-3xl pb-2">Create Resource</div>
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
                    }}>Close</Button>
                <Button type="primary">Create resource</Button>
            </div>
        </div>
    </form>
</div>

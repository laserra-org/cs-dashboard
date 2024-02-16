<script>
    import { Input, Label, Select, Button, Textarea } from '$lib/components/atoms';
    import { createAgreement } from '$lib/api/agreements'; //
    import { modalData } from '$lib/stores';
    import { isAuthenticated } from '$lib/auth';
    import { closeModal } from '$lib/modal.js';

    let token = isAuthenticated();
    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        label: '',
        notes: ''
    };

    async function handleSubmit() {
        try {
            const body = {
                domain: localStorage.getItem('activeDomain'),
                label: formData.label,
                is_active: true,
                type: parentData.type.value,
                notes: formData.notes
            };
            const responseData = await createAgreement({'token':token}, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }



</script>

<div>
    <div class="font-bold text-3xl pb-2">Create {parentData.type.name}</div>
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
                        bind:value={formData.label} />
            </div>
            <div class="sm:col-span-2 flex flex-col">
                <Label
                    >Notes</Label>
                    <Textarea
                        id="notes"
                        placeholder="Your notes here"
                        name="notes"
                        bind:value={formData.notes} />
            </div>
            <div class="sm:col-span-2 flex w-full justify-between py-4">
                <Button
                    type="secondary"
                    on:click={(event) => {
                        event.preventDefault();
                        closeModal();
                    }}>Close</Button>
                <Button type="primary">Create {parentData.type.name}</Button>
            </div>
        </div>
    </form>
</div>

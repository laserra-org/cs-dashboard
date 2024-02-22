<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { getResourceService, deleteResourceService } from "$lib/api/resource_services"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";
    import { onMount } from 'svelte';

    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    console.log(parentData);

    let formData = {
        service: "",
    };

    onMount(async () => {
        const response = await getResourceService({}, { resource: parentData.resource_id, id: parentData.service_id });
        formData.service = response.service_id;
        isLoading = false;
    });

    async function handleSubmit() {
        try {
            const params = {
                resource: parentData.resource_id,
                id: parentData.service_id
            };
            const responseData = await deleteResourceService({}, params); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div>
    <div class="font-bold text-3xl pb-2">Delete a Service</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label>Service</Label>
                <Input disabled
                    type="text"
                    id="service"
                    placeholder="service"
                    required
                    bind:value={formData.service}
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
                <Button type="primary">Delete!</Button>
            </div>
        </div>
    </form>
</div>

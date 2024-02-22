<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import { createResourceService } from "$lib/api/resource_services"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";

    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    console.log(parentData);

    let formData = {
        service: "",
    };

    async function handleSubmit() {
        try {
            const params = {
                resource: parentData.obj.id,
                service: formData.service,
            };
            const body = {};
            const responseData = await createResourceService({}, params, body); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div>
    <div class="font-bold text-3xl pb-2">Link a Service</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label>Service</Label>
                <Input
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
                <Button type="primary">Link</Button>
            </div>
        </div>
    </form>
</div>

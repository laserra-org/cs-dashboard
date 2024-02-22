<script>
    import {
        Input,
        Label,
        Select,
        Button,
        Textarea,
        Checkbox,
    } from "$lib/components/atoms";
    import {
        getResourceService,
        deleteResourceService,
    } from "$lib/api/resource_services"; //
    import { modalData } from "$lib/stores";
    import { closeModal } from "$lib/modal.js";
    import { onMount } from "svelte";
    import { deleteBooking } from "$lib/api/bookings";

    let parentData;
    let isLoading = true;

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
                id: parentData.id,
            };
            const responseData = await deleteBooking({}, params); // Call the API function
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div>
    <div class="font-bold text-3xl pb-2">Delete Booking</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="sm:col-span-2 flex w-full justify-between py-4">Sei sicuro di voler cancellare la prenotazione {parentData.id}?</div>
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

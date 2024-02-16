<script>
    import { Input, Label, Select, Button, Textarea, DateInput, AmountInput, Spinner } from '$lib/components/atoms';
    import { updatePayment, getPayment } from '$lib/api/payments'; //
    import { modalData } from '$lib/stores';
    import { isAuthenticated } from '$lib/auth';
    import { closeModal } from '$lib/modal.js';
    import { onMount } from 'svelte';

    let token = isAuthenticated();
    let parentData;
    let isLoading = true;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        label: '',
        type: '',
        dueDate: '',
        amount: '',
        currency: '',
        notes: '',
    };

    let currencies = [{value: 'EUR', name: 'EUR'}];

    onMount(async () => {
            const response = await getPayment({'token':token}, {'id': parentData.id});
            formData.label = response.label;
            formData.type = response.type;
            formData.dueDate = response.due_date;
            formData.amount = response.amount;
            formData.currency = response.currency;
            formData.notes = response.notes;
            isLoading = false;
    });

    async function handleSubmit() {
        try {
            const body = {
                label: formData.label,
                type: formData.type,
                due_date: formData.dueDate,
                amount: formData.amount,
                currency: formData.currency,
                notes: formData.notes,
            };
            const responseData = await updatePayment({'token':token}, {'id': parentData.id}, body);
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let payment_types = [
        { value: 'OUTGOING', name: 'Outgoing' },
        { value: 'INCOMING', name: 'Incoming' }
    ];

</script>

{#if isLoading}
<Spinner />
{:else}
<div>
    <div class="font-bold text-3xl pb-2">Update Payment</div>
    <form on:submit={handleSubmit}>
        <div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="flex flex-col">
                <Label>Name</Label>
                <Input
                    type="text"
                    id="label"
                    placeholder="Enter payment label (e.g. Capital)"
                    required
                    bind:value={formData.label} />
            </div>
            <div class="flex flex-col">
                <Label>Type</Label>
                <Select items={payment_types} bind:value={formData.type} />
            </div>
            <div class="flex flex-col">
                <Label>Due Date</Label>
                <DateInput
                    type="text"
                    id="label"
                    placeholder="Enter due date"
                    required
                    bind:value={formData.dueDate} />
            </div>
            <div class="flex flex-col">
                <Label>Amount</Label>
                <AmountInput
                    type="text"
                    id="label"
                    placeholder="0.00"
                    required
                    bind:value={formData.amount} />
            </div>
            <div class="flex flex-col">
                <Label>Currency</Label>
                <Select items={currencies} bind:value={formData.currency} />
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
                <Button type="primary">Update Payment</Button>
            </div>
        </div>
    </form>
</div>
{/if}
<script>
    import {
        Input,
        DateInput,
        AmountInput,
        Label,
        Select,
        Button,
        Textarea,
    } from '$lib/components/atoms';
    import { createPayment } from '$lib/api/payments'; //
    import { modalData } from '$lib/stores';
    import { closeModal } from '$lib/modal.js';
    import { isAuthenticated } from '$lib/auth';

    let token = isAuthenticated();
    let parentData;

    modalData.subscribe((value) => {
        parentData = value.obj;
    });

    let formData = {
        label: '',
        type: '',
        dueDate: '',
        amount: '',
        currency: '',
        settled: false,
        notes: '',
    };

    let currencies = [{ value: 'EUR', name: 'EUR' }];

    async function handleSubmit() {
        try {
            const body = {
                domain: localStorage.getItem('activeDomain'),
                label: formData.label,
                is_active: true,
                type: formData.type,
                due_date: formData.dueDate,
                amount: formData.amount,
                currency: formData.currency,
                settled: formData.settled,
                notes: formData.notes,
                agreement: parentData.agreementId,
            };
            console.log(body);
            const responseData = await createPayment({ token: token }, body); // Call the API function
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

<div>
    <div class="font-bold text-3xl pb-2">Create Payment</div>
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
                <Label>Notes</Label>
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
                <Button type="primary">Create Payment</Button>
            </div>
        </div>
    </form>
</div>

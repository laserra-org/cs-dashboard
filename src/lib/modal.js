import { modalData } from '$lib/stores';

export function toggleModal(showModal, component, data = '') {
    if (showModal) {
        modalData.update((currentValue) => {
            return { ...currentValue, open: false };
        });
    } else {
        modalData.update((currentValue) => {
            return { open: true, obj: data, content: component };
        });
    }
}


export function closeModal() {
    modalData.update((currentValue) => {
        return { ...currentValue, open: false };
    });
}

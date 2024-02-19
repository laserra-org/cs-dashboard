import { writable } from 'svelte/store';

export const appModuleName = writable('');

export const navbarMenu = writable('');

export const activeDomain = writable('');

export const modalData = writable({'open':false, 'obj':'', 'content':''});
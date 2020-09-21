import { writable } from 'svelte/store';

export const totalAmount = writable(0);
export const monthlyBreakdown = writable([]);
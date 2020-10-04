import { writable } from 'svelte/store';

export const totalAmount = writable(0);
function createMonthlyBreakdown() {
	const { subscribe, set, update } = writable([]);

	return {
        subscribe,
        set: (item) => set(item),
        edit: (index, item) => update(n => {
            n.map((x,i) => i === index ? item : x)
        }),
		reset: () => set([])
	};
}

export const monthlyBreakdown = createMonthlyBreakdown();
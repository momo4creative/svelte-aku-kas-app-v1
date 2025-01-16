<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import Button from '@ui/button/button.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		href?: string;
	}
	let { href }: Props = $props();

	let isOpen = $state(false);
	let menu1: string[][] = [
		['Akun', '/akun'],
		['Transaksi', '/transaksi']
	];
	const menu: string[][] = $derived(isOpen ? menu1 : []);

	function clickBtn(v: string) {
		const redirectTo = page.url.pathname;
		return goto(v + '/buat?redirectTo=' + redirectTo);
	}
</script>

<div class="fixed bottom-8 right-4 z-20 flex flex-col items-end gap-2">
	{#each menu as [label, href], i (label)}
		<div animate:flip in:fly={{ y: 20, delay: i * 100 }} out:fly={{ x: 20, delay: 0 }}>
			<Button onclick={() => clickBtn(href)}>{label}</Button>
		</div>
	{/each}

	<button
		onclick={() => {
			if (href) return clickBtn(href);
			isOpen = !isOpen;
		}}
		class="rounded-full bg-gray-600 p-2 text-white transition delay-100 hover:bg-gray-700"
	>
		<Icon icon="mdi:plus-thick" width="24" />
	</button>
</div>

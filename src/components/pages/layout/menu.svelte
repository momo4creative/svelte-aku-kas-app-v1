<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/state';
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		isOpen?: boolean;
	}
	let { isOpen }: Props = $props();

	const toggle = () => (isOpen = !isOpen);

	type Menus = [string, string, boolean];
	const menus1: Menus[] = [
		['Beranda', '/', true],
		['Akun', '/akun', false],
		['Transaksi', '/transaksi', false]
	];

	const menus = $derived(
		menus1.map((m) => {
			m[2] =
				page.url.pathname == '/' && m[1] == '/'
					? true
					: m[1] != '/' && page.url.pathname.startsWith(m[1]);
			return m;
		})
	);

	// $effect(() => {
	// 	if (navigating.from) {
	// 		setTimeout(() => (isOpen = false), 500);
	// 	}
	// });
</script>

<button
	onclick={toggle}
	class="rounded-full bg-white/5 p-1.5 text-gray-300 outline-2 outline-offset-2 outline-blue-500 transition hover:bg-white/15 hover:text-white focus:outline"
>
	<Icon icon="mdi:menu" width="24" />
</button>

{#if isOpen}
	<div transition:fade class="fixed inset-0 flex bg-black/20">
		<div transition:fly={{ x: -100 }} class="flex-1 bg-gray-700">
			<nav class="my-12 grid">
				{#each menus as [label, href, active]}
					<a
						{href}
						onclick={(e) => {
							isOpen = false;
							e.preventDefault();
							setTimeout(() => {
								goto(href);
							}, 400);
						}}
						class={cn('px-4 py-2 text-gray-400 hover:text-gray-100', {
							'bg-gray-800 text-gray-100': active
						})}>{label}</a
					>
				{/each}
			</nav>
		</div>
		<button onclick={toggle} class="w-2/6 cursor-default" aria-label="close"></button>
	</div>
{/if}

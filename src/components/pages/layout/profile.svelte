<script lang="ts">
	import Icon from '@iconify/svelte';
	import { user } from '$lib/share/user.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {}
	let {}: Props = $props();

	let isOpen = $state(false);

	const open = () => (isOpen = true);
	const close = () => (isOpen = false);
</script>

<div
	role="button"
	tabindex="0"
	onfocus={open}
	onmouseover={open}
	onmouseleave={close}
	aria-label="btn profile"
	class="relative rounded-full outline-2 outline-offset-2 outline-blue-500 transition focus:outline"
>
	<div class="rounded-full bg-white/5 p-1.5 text-gray-300 hover:bg-white/15 hover:text-white">
		<Icon icon="mdi:user" width="24" />
	</div>

	{#if isOpen}
		<div
			transition:fly={{ y: -10 }}
			class="fixed right-2 grid rounded-md bg-white shadow-lg transition-all"
		>
			<span class="px-2 py-1 text-gray-700">{user.data?.username}</span>
			<a href="/auth?logout" class="m-1 rounded-full bg-red-600 px-4 hover:bg-red-700">Logout</a>
		</div>
	{/if}
</div>

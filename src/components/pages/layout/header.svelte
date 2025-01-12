<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import Menu from './menu.svelte';
	import Profile from './profile.svelte';

	interface Props extends HTMLBaseAttributes {
		title: string;
	}
	let { title }: Props = $props();
</script>

<header class="sticky top-0 z-30 flex h-12 items-center bg-gray-700 px-2 text-gray-100">
	<Menu />

	<h1 class="flex-1 overflow-hidden text-nowrap text-center text-2xl font-bold tracking-wider">
		{title}
	</h1>

	<Profile />
</header>

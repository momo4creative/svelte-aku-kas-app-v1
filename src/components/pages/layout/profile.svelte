<script lang="ts">
	import Icon from '@iconify/svelte';
	import { user } from '$lib/share/user.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {}
	let {}: Props = $props();
</script>

<div class="group relative">
	<button
		class="rounded-full bg-white/5 p-1.5 text-gray-300 outline-2 outline-offset-2 outline-blue-500 transition hover:bg-white/15 hover:text-white focus:outline"
	>
		<Icon icon="mdi:user" width="24" />
	</button>

	<div class="fixed right-2 hidden rounded-md bg-white shadow-lg transition-all group-hover:grid">
		<span class="px-2 py-1 text-gray-700">{user.data?.username}</span>
		<a href="/auth?logout" class="m-1 rounded-full bg-red-600 px-4 hover:bg-red-700">Logout</a>
	</div>
</div>

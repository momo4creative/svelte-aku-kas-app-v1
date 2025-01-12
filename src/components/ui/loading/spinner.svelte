<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {}
	let { class: className }: Props = $props();
</script>

<div
	style="aspect-ratio: 1/1;"
	class={cn(
		'relative mx-auto flex h-14 w-fit items-center justify-center rounded-full bg-white/25',
		className
	)}
>
	<span
		class="absolute inset-0 animate-spin rounded-full border-4 border-slate-400 border-b-transparent border-t-transparent"
		>&nbsp;</span
	>
	<span
		style="animation-direction: reverse;"
		class="absolute inset-2 animate-spin rounded-full border-8 border-slate-500 border-l-transparent border-r-transparent"
		>&nbsp;</span
	>
</div>

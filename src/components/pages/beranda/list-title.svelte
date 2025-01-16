<script lang="ts">
	import cn from '$lib/utils/cn';
	import { formatNumberToRupiah } from '$lib/utils/format';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		title: string;
		value?: number;
		isOpen?: boolean;
	}
	let { title, value = 0, isOpen, children }: Props = $props();
</script>

<div
	class={cn('relative my-2 flex justify-between bg-gray-300 px-4 py-1 text-2xl', {
		'bg-slate-300': isOpen
	})}
>
	<h1 class="font-bold">{title}</h1>
	{#if value}
		<span class="">{formatNumberToRupiah(value)}</span>
	{/if}

	<button
		onclick={() => (isOpen = !isOpen)}
		aria-label="btn-overlay"
		class="absolute inset-0 bg-transparent"
	></button>
</div>

{#if isOpen}
	<div transition:fade>
		{@render children?.()}
	</div>
{/if}

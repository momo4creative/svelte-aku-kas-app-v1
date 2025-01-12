<script lang="ts">
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		icon?: string;
	}
	let { children, icon, class: className, ...props }: Props = $props();
</script>

{#snippet icons()}
	{#if icon}
		<span class="">
			<Icon icon="mdi:{icon}" class="" />
		</span>
	{/if}
{/snippet}

<button
	type="button"
	{...props}
	class={cn(
		'inline-flex h-10 items-center justify-center rounded border px-3 leading-none text-white',
		'outline-2 outline-offset-2 focus:outline',
		'bg-slate-500 outline-slate-500 hover:bg-slate-600',
		className
	)}
>
	{@render icons()}
	{#if children}
		<span class="px-2">{@render children?.()}</span>
	{/if}
</button>

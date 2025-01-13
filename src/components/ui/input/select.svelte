<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrrMsg from './errr-msg.svelte';
	import Options from './options.svelte';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
		options: string[][];
		isOpen?: boolean;
	}

	let {
		label,
		value = $bindable(),
		isOpen = $bindable(),
		errors,
		options,
		...props
	}: Props = $props();

	let str = $derived(options.filter((v) => v[1] == value)?.[0]?.[0]);
</script>

{#snippet input()}
	<input
		{...props}
		type="text"
		readonly
		value={str ?? 'Pilih !'}
		spellcheck="false"
		onclick={() => (isOpen = !isOpen)}
		oninput={() => (errors = undefined)}
		class={cn(
			'h-10 w-full rounded px-4 leading-none transition',
			'border border-gray-300 hover:border-gray-400',
			'outline-2 outline-offset-2 outline-blue-500 focus:outline',
			'cursor-pointer',
			{ 'border-red-300 outline-red-500 hover:border-red-400': !!errors }
		)}
	/>
{/snippet}

<label>
	<span class="mb-0.5 block">{label}</span>
	<div class="relative">
		{@render input()}
	</div>
	<ErrrMsg {errors} />
</label>

<input type="text" name={props.name} {value} hidden />

{#if isOpen}
	<Options {options} bind:value bind:isOpen />
{/if}

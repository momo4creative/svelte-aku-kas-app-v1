<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrrMsg from './errr-msg.svelte';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
	}
	let { label, value = $bindable(), errors, ...props }: Props = $props();
</script>

{#snippet input()}
	<input
		type="text"
		bind:value
		oninput={() => (errors = undefined)}
		{...props}
		spellcheck="false"
		class={cn(
			'h-10 w-full rounded px-4 leading-none transition',
			'border-2 border-gray-300 hover:border-gray-400',
			'outline-2 outline-offset-2 outline-blue-500 focus:outline',
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

<style lang="postcss">
	:global([type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button) {
		-webkit-appearance: none;
		margin: 0;
	}
</style>

<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrrMsg from './errr-msg.svelte';
	import type { Action } from 'svelte/action';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
		prefix?: string;
	}
	let { label, value = $bindable(), prefix = 'Rp', errors, ...props }: Props = $props();

	let str = $state(formatRibuan(value));

	function changeValue(v: string) {
		value = v.replaceAll('.', '');
	}

	function formatRibuan(v: any) {
		if (!v) return;
		return new Intl.NumberFormat('id').format(v);
	}

	const inputType: Action = (node) => {
		function handleFocus() {
			node.setAttribute('type', 'number');
			str = str?.replaceAll('.', '');
		}
		function handleBlur() {
			node.setAttribute('type', 'text');
			str = formatRibuan(value);
		}
		node.addEventListener('focus', handleFocus);
		node.addEventListener('blur', handleBlur);

		$effect(() => {
			return () => {
				node.removeEventListener('focus', handleFocus);
				node.removeEventListener('blur', handleBlur);
			};
		});
	};
</script>

{#snippet input()}
	<input
		{...props}
		use:inputType
		type="text"
		name="_"
		spellcheck="false"
		autocomplete="off"
		value={str}
		oninput={({ currentTarget }) => {
			errors = undefined;
			changeValue(currentTarget.value);
		}}
		placeholder="0"
		class={cn(
			'h-10 w-full rounded px-4 ps-10 leading-none transition',
			'border border-gray-300 hover:border-gray-400',
			'outline-2 outline-offset-2 outline-blue-500 focus:outline',
			{ 'border-red-300 outline-red-500 hover:border-red-400': !!errors }
		)}
	/>
{/snippet}

<label>
	<span class="mb-0.5 block">{label}</span>
	<div class="relative flex items-center">
		{@render input()}
		<span class="absolute left-4">{prefix}</span>
	</div>
	<ErrrMsg {errors} />
</label>
<input type="number" name={props.name} {value} hidden />

<style lang="postcss">
	[type='number']::-webkit-inner-spin-button,
	[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>

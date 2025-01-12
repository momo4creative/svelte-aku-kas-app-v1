<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '@ui/button/button.svelte';
	import type { Action } from 'svelte/action';
	import { fly } from 'svelte/transition';

	interface Props {
		onEdit?: () => void;
		onDelete?: () => void;
	}
	let { onEdit, onDelete }: Props = $props();

	let isOpen = $state(false);

	const mouseover: Action = (node) => {
		const mouseover = () => (isOpen = true);
		const mouseleave = () => (isOpen = false);

		$effect(() => {
			node.addEventListener('mouseover', mouseover);
			node.addEventListener('mouseleave', mouseleave);
			return () => {
				node.removeEventListener('mouseover', mouseover);
				node.removeEventListener('mouseleave', mouseleave);
			};
		});
	};
</script>

{#snippet btn()}
	<button class="rounded-full bg-gray-100 p-1.5 group-hover:bg-gray-300">
		<Icon icon="mdi:dots-vertical" />
	</button>
{/snippet}

{#snippet item()}
	<div
		transition:fly={{ x: 10 }}
		class="absolute right-0 z-10 grid gap-2 rounded bg-gray-200 p-1 text-white shadow-lg transition"
	>
		<Button onclick={onEdit} icon="pencil">Ubah</Button>
		<Button onclick={onDelete} icon="trash">Hapus</Button>
	</div>
{/snippet}

<div use:mouseover class="group relative">
	{@render btn()}
	{#if isOpen}
		{@render item()}
	{/if}
</div>

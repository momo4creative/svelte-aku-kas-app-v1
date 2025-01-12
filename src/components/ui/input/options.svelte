<script lang="ts">
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import Button from '../button/button.svelte';
	import Modal from '@ui/modal/modal.svelte';

	interface Props extends HTMLBaseAttributes {
		options: string[][];
		value?: string;
		isOpen?: boolean;
	}

	let { options, isOpen = $bindable(), value = $bindable() }: Props = $props();
</script>

{#snippet radio(v: string[])}
	<input hidden type="radio" bind:group={value} name={v[0]} value={v[1]} checked={v[1] == value} />
{/snippet}

{#snippet item()}
	<div class="my-2 grid divide-y">
		{#each options as v}
			<label
				class={cn(
					'flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700',
					{
						'bg-blue-100 text-blue-700': v[1] == value
					}
				)}
			>
				<span class="relative">
					<Icon icon="mdi:checkbox-blank-outline" width="18" class="opacity-50" />
					{#if v[1] == value}
						<Icon icon="mdi:check" width="24" class="absolute bottom-0 left-0" />
					{/if}
				</span>

				{@render radio(v)}
				<span>{v[0]}</span>
			</label>
		{/each}
	</div>
{/snippet}

<Modal bind:isOpen title="Pilih salah satu !">
	{@render item()}

	{#snippet footer()}
		<footer class="px-4 py-2">
			<Button onclick={() => (isOpen = false)} class="w-full">OK</Button>
		</footer>
	{/snippet}
</Modal>

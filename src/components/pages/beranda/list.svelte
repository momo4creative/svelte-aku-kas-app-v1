<script lang="ts">
	import { formatNumberToRupiah } from '$lib/utils/format';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		values: SummaryAkun[];
	}
	let { values }: Props = $props();
</script>

<ul class="divide-y">
	{#each values as v, i (v)}
		<li animate:flip in:fly={{ y: -20, delay: i * 200 }} out:fade class="bg-white px-4 py-2">
			<div class="text-lg font-medium">
				<span>{v.code}</span>
				<span>{v.name}</span>
			</div>
			<div class="text-gray-500">
				<span class="ms-auto">{formatNumberToRupiah(v.value)}</span>
				{#if v.limit}
					<span>/</span>
					<span>{formatNumberToRupiah(v.limit)}</span>
				{/if}
			</div>
		</li>
	{/each}
</ul>

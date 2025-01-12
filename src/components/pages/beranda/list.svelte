<script lang="ts">
	import cn from '$lib/utils/cn';
	import { formatNumberToRupiah } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		values: SummaryAkun[];
	}
	let { values }: Props = $props();

	let isOpenId: string | null = $state(null);
</script>

{#snippet transaksi(transaksis: Transaksi[])}
	<ul transition:fade class="my-2 divide-y">
		{#each transaksis as t}
			<li class="flex gap-2 bg-slate-100 px-2 py-1">
				<span>{new Date(t.tanggal).getDate()}</span>
				<span>{t.desc}</span>
				<span class="ms-auto">{formatNumberToRupiah(t.value)}</span>
			</li>
		{/each}
	</ul>
{/snippet}

<ul class="divide-y">
	{#each values as v, i (v)}
		<li animate:flip in:fly={{ y: -20, delay: i * 200 }} out:fade class="bg-white px-4 py-2">
			<div class="flex items-center justify-between">
				<button
					onclick={() => (isOpenId = isOpenId == v.id ? null : v.id)}
					class={cn('group -ms-3 flex items-center justify-between gap-2 text-lg font-medium', {
						'pointer-events-none': v.transaksi.length == 0
					})}
				>
					<span class="text-gray-400 group-hover:text-inherit">
						<Icon icon="mdi:arrow-down-drop" width="24" rotate={isOpenId == v.id ? 0 : -45} />
					</span>
					<span>{v.code}</span>
					<span>{v.name}</span>
				</button>

				<div class="ms-auto font-medium text-gray-500">
					<span class="">{formatNumberToRupiah(v.value)}</span>
					{#if v.limit}
						<span class="text-sm">/ {formatNumberToRupiah(v.limit)}</span>
					{/if}
				</div>
			</div>

			{#if isOpenId == v.id}
				{@render transaksi(v.transaksi)}
			{/if}
		</li>
	{/each}
</ul>

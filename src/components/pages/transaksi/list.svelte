<script lang="ts">
	import { goto } from '$app/navigation';
	import { list } from '$lib/share/list.svelte';
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';
	import AksiList from '@pages/layout/aksi-list.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		values: SummaryTransaksi[];
	}
	let { values }: Props = $props();
</script>

<ul class="divide-y">
	{#each values as v, i (v)}
		<li animate:flip in:fly={{ y: -20, delay: i * 200 }} out:fade class="bg-white px-4 py-2">
			<div class="flex gap-2">
				<h1 class="flex-1 text-lg font-medium">{v.data[1].desc}</h1>
				<span>{formatNumberToRupiah(v.data[1].value)}</span>
				<AksiList onEdit={() => goto('/transaksi/ubah?code=' + v.code)} onDelete={() => {}} />
			</div>

			<div>
				<span>{v.data[0].akun.name}</span>
				<span>{v.data[1].akun.name}</span>
			</div>

			<small class="block">{formatDateIndo(v.data[1].tanggal)}</small>
		</li>
	{/each}
</ul>

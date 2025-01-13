<script lang="ts">
	import { goto } from '$app/navigation';
	import { list } from '$lib/share/list.svelte';
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import AksiList from '@pages/layout/aksi-list.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		values: SummaryTransaksi[];
	}
	let { values }: Props = $props();

	let datas: typeof values = $state([]);
	setTimeout(() => {
		datas = values;
	}, 0);
</script>

<ul class="divide-y">
	{#each datas as v, i (v)}
		<li
			animate:flip
			in:fly={{ y: -10, delay: i * 100 }}
			out:fade
			class="relative bg-white px-4 py-2 pe-14"
		>
			<div class="flex gap-2">
				<h1 class="flex-1 text-lg font-medium">{v.data[1].desc}</h1>
				<span>{formatNumberToRupiah(v.data[1].value)}</span>
			</div>

			<div class="flex items-center">
				<span>{v.data[0].akun.name}</span>
				<Icon icon="mdi:arrow-down-drop" width="18" rotate={-45} />
				<span>{v.data[1].akun.name}</span>
				<small class="ms-auto block">{formatDateIndo(v.data[1].tanggal)}</small>
			</div>

			<div class="absolute inset-y-0 right-0 flex items-center px-2">
				<AksiList
					onEdit={() => goto('/transaksi/ubah?code=' + v.code)}
					onDelete={() => (
						(list.aksi.delete = v.data.map((d) => d.id)), (list.aksi.name = 'transaksi')
					)}
				/>
			</div>
		</li>
	{/each}
</ul>

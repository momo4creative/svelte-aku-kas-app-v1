<script lang="ts">
	import { goto } from '$app/navigation';
	import { list } from '$lib/share/list.svelte';
	import { formatNumberToRupiah } from '$lib/utils/format';
	import AksiList from '@pages/layout/aksi-list.svelte';
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
		<li
			animate:flip
			in:fly={{ y: -20, delay: i * 200 }}
			out:fade
			class="flex gap-2 bg-white px-4 py-2"
		>
			<div class="text-lg font-medium">
				<span>{v.code}</span>
				<span>{v.name}</span>
			</div>
			<span class="ms-auto">{formatNumberToRupiah(v.limit ?? 0)}</span>
			<AksiList
				onEdit={() => goto('/akun/ubah?id=' + v.id)}
				onDelete={() => ((list.aksi.delete = v.id), (list.aksi.name = 'akun'))}
			/>
		</li>
	{/each}
</ul>

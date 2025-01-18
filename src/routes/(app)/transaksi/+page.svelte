<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/transaksi/list.svelte';
	import { listTransaksi } from '$lib/stores/list-store';
	import More from '@pages/transaksi/more.svelte';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		listTransaksi.addMore(data.summary_transaksi);
	});

	$inspect($listTransaksi.result);
</script>

<Header title="Transaksi" />

<FloatBtn href="/transaksi" />

<List values={$listTransaksi.result.data} />

<More />

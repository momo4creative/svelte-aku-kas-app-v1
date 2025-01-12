<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/transaksi/list.svelte';
	import { list } from '$lib/share/list.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="Transaksi" />

<FloatBtn href="/transaksi" />

<List values={list.transaksi.result.data} />

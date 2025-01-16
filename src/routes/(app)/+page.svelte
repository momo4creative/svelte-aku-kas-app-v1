<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/beranda/list.svelte';
	import Filter from '@pages/layout/filter.svelte';
	import { listAkun } from '$lib/stores/list-store';
	import ListTitle from '@pages/beranda/list-title.svelte';

	let { data }: { data: PageData } = $props();

	const total_tunai = $derived(
		$listAkun.result.data.filter((d) => d.code == 1001).reduce((s, v) => s + v.value, 0)
	);
	const total_biaya = $derived(
		$listAkun.result.data
			.filter((d) => d.code.toString().startsWith('5'))
			.reduce((s, v) => s + v.value, 0)
	);
</script>

<Header title="AKUKAS-APP" />

<Filter bulan={data.bulan} tahun={data.tahun} />

<ListTitle title="Kas" value={total_tunai} isOpen>
	<List values={$listAkun.result.data.filter((d) => d.code.toString().startsWith('1'))} />
</ListTitle>

<ListTitle title="Biaya" value={total_biaya}>
	<List values={$listAkun.result.data.filter((d) => d.code.toString().startsWith('5'))} />
</ListTitle>

<ListTitle title="Lain">
	<List
		values={$listAkun.result.data.filter(
			(d) => !d.code.toString().startsWith('1') && !d.code.toString().startsWith('5')
		)}
	/>
</ListTitle>

<FloatBtn />

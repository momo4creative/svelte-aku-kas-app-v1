<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/beranda/list.svelte';
	import Filter from '@pages/layout/filter.svelte';
	import { listAkun } from '$lib/stores/list-store';

	let { data }: { data: PageData } = $props();
</script>

<Header title="AKUKAS-APP" />
<Filter bulan={data.bulan} tahun={data.tahun} />

<List values={$listAkun.result.data} />
<FloatBtn />

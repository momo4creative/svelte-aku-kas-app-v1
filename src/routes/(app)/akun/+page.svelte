<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/akun/list.svelte';
	import { list } from '$lib/share/list.svelte';
	import { listAkun } from '$lib/stores/list-store';

	let { data }: { data: PageData } = $props();
	// let values:SummaryAkun[] = $state([])
</script>

<Header title="Akun" />

<List values={$listAkun.result.data} />

<FloatBtn href="/akun" />

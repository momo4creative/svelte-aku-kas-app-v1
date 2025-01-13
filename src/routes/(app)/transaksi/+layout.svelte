<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { list } from '$lib/share/list.svelte';
	import { listTransaksi } from '$lib/stores/list-store';
	import DataLoading from '@ui/loading/data-loading.svelte';
	import Alert from '@ui/message/alert.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	$effect(() => {
		listTransaksi.init(data.promise_summary_transaksi);
	});
</script>

<DataLoading isLoading={$listTransaksi.loading} />

<Alert {...$listTransaksi.error} />

{@render children()}

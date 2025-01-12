<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { list } from '$lib/share/list.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	$effect(() => {
		list.loading = true;
		data.promise_summary_transaksi.then((res) => {
			list.loading = false;
			if (!res.success) return (list.transaksi.error = res.error);
			list.transaksi.result = res.result;
		});
	});
</script>

{@render children()}

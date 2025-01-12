<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { user } from '$lib/share/user.svelte';
	import { list } from '$lib/share/list.svelte';
	import DataLoading from '@ui/loading/data-loading.svelte';
	import ModalDelete from '@pages/layout/modal-delete.svelte';
	import Alert from '@ui/message/alert.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	user.data = data.user;

	$effect(() => {
		list.loading = true;
		data.promise_summary_akun.then((res) => {
			list.loading = false;
			if (!res.success) return (list.akun.error = res.error);
			list.akun.result = res.result;
		});
	});
</script>

<svelte:head>
	<title>AKUKAS-APP</title>
</svelte:head>

<div class="grid h-dvh grid-rows-[1fr_max-content]">
	<div class="pb-4">
		{@render children()}
	</div>

	<footer class="sticky bottom-0 z-10 bg-gradient-to-t from-gray-200 pt-8">
		<div class="flex justify-between bg-gray-200 px-4 py-0.5 font-mono text-sm">
			<span>&copy; 2025 by MomoCreative</span>
			<span>v 0.1.0</span>
		</div>
	</footer>
</div>

<DataLoading isLoading={list.loading} />

<Alert {...list.akun.error} />

<ModalDelete />

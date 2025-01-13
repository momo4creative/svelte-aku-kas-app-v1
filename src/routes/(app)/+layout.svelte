<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { user } from '$lib/share/user.svelte';
	import { list } from '$lib/share/list.svelte';
	import DataLoading from '@ui/loading/data-loading.svelte';
	import ModalDelete from '@pages/layout/modal-delete.svelte';
	import Alert from '@ui/message/alert.svelte';
	import Footer from '@pages/layout/footer.svelte';
	import { navigating } from '$app/state';

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

	<Footer />
</div>

<DataLoading isLoading={list.loading || !!navigating.from} />

<Alert {...list.akun.error} />

{#if list.aksi.delete}
	<ModalDelete />
{/if}

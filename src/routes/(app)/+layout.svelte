<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { user } from '$lib/share/user.svelte';
	import { aksi } from '$lib/share/list.svelte';
	import ModalDelete from '@pages/layout/modal-delete.svelte';
	import Alert from '@ui/message/alert.svelte';
	import Footer from '@pages/layout/footer.svelte';
	import { listAkun, listTransaksi } from '$lib/stores/list-store';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	user.data = data.user;

	$effect(() => {
		listAkun.init(data.promise_summary_akun);
		listTransaksi.init(data.promise_summary_transaksi);
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

<Alert {...$listAkun.error} />
<Alert {...$listTransaksi.error} />

{#if aksi.name}
	<ModalDelete />
{/if}

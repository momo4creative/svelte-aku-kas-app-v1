<script lang="ts">
	import Form from '@pages/layout/form.svelte';
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FieldForm from '@pages/transaksi/field-form.svelte';
	import { listTransaksi } from '$lib/stores/list-store';

	let { data }: { data: PageData } = $props();

	const values = $derived($listTransaksi.result.data.filter((d) => d.code == data.code)?.[0]?.data);
</script>

<Header title="Buat Transaksi" />

<Form title="Ubah Transaksi" action="/transaksi?/update" redirect="/transaksi" class="my-6 px-4">
	{#snippet childrenSnippet(error)}
		<FieldForm {error} {values} />
	{/snippet}
</Form>

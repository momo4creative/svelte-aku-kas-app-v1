<script lang="ts">
	import Form from '@pages/layout/form.svelte';
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FieldForm from '@pages/transaksi/field-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="Buat Transaksi" />

<Form title="Buat Akun" action="/transaksi?/create" redirect="/akun" class="my-6 px-4">
	{#snippet childrenSnippet(error)}
		<FieldForm {error} />
	{/snippet}
</Form>

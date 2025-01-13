<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import Form from '@pages/layout/form.svelte';
	import FieldForm from '@pages/akun/field-form.svelte';
	import type { PageData } from './$types';
	import { list } from '$lib/share/list.svelte';
	import { listAkun } from '$lib/stores/list-store';

	let { data }: { data: PageData } = $props();

	const value = $derived($listAkun.result.data.filter((d) => d.id == data.id)[0]);
</script>

<Header title="Ubah Akun" />

<Form title="Ubah Akun" action="/akun?/update" redirect="/akun" class="my-6 px-4">
	{#snippet childrenSnippet(error)}
		<FieldForm {error} {value} />
	{/snippet}
</Form>

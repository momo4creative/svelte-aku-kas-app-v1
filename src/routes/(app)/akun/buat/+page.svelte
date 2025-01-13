<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import Form from '@pages/layout/form.svelte';
	import FieldForm from '@pages/akun/field-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="Buat Akun" />

<Form title="Buat Akun Baru" action="/akun?/create" redirect="/akun" class="my-6 px-4">
	{#snippet childrenSnippet(error)}
		<FieldForm {error} />
	{/snippet}
</Form>

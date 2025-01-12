<script lang="ts">
	import Modal from '@ui/modal/modal.svelte';
	import { list } from '$lib/share/list.svelte';
	import Button from '@ui/button/button.svelte';
	import { handleSubmit, type CallbackSubmit } from '$lib/utils/handle-submit';
	import { enhance } from '$app/forms';
	import Spinner from '@ui/loading/spinner.svelte';
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import Alert from '@ui/message/alert.svelte';
	import { invalidate } from '$app/navigation';

	interface Props {}
	let {}: Props = $props();

	let error = $state<ErrorZod>();
	let isLoading = $state(false);

	const callback: CallbackSubmit = {
		loading: (val) => (isLoading = val),
		failure: (err) => (error = err),
		success: () => {
			list.aksi = {};
			invalidate('base:layout');
		}
	};
</script>

<Modal isOpen={!!list.aksi.delete}>
	<div class="relative">
		<h1 class="my-6 px-4 text-center text-3xl font-medium">Apakah anda yakin menghapus ?</h1>

		{#if error}
			<Alert {...error} />
		{/if}

		<form
			use:enhance={() => handleSubmit('Hapus ' + list.aksi.name, callback)}
			action="/{list.aksi.name}?/delete"
			method="post"
			class="my-4 flex justify-center gap-2"
		>
			<input type="text" name="id" value={list.aksi.delete} hidden />

			<Button type="submit">Ya</Button>
			<Button onclick={() => (list.aksi.delete = undefined)}>Tidak</Button>
		</form>

		{#if isLoading}
			<div class="absolute inset-0 flex items-center justify-center bg-white/10">
				<Spinner />
			</div>
		{/if}
	</div>
</Modal>

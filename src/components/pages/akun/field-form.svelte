<script lang="ts">
	import { akunSchema } from '$lib/schema/akun';
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import { list } from '$lib/share/list.svelte';
	import { listAkun } from '$lib/stores/list-store';
	import { Input, Rupiah } from '@ui/input';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		error?: ErrorZod<typeof akunSchema.create>;
		value?: Akun;
	}
	let { error, value }: Props = $props();

	const listCodes = $derived($listAkun.result.data.map((d) => d.code));
</script>

<input type="text" name="id" value={value?.id} hidden />

<div class="grid gap-2">
	<Input
		value={value?.code}
		errors={error?.errors?.code}
		listExis={listCodes}
		name="code"
		label="Kode"
		type="number"
		maxChar={4}
	/>
	<Input value={value?.name} errors={error?.errors?.name} name="name" label="Nama" />
	<Rupiah value={value?.limit} errors={error?.errors?.limit} name="limit" label="Limit" />
</div>

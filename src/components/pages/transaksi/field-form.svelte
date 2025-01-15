<script lang="ts">
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import type { transaksiSchema } from '$lib/schema/transaksi';
	import { listAkun, listTransaksi } from '$lib/stores/list-store';
	import { formatDateInput } from '$lib/utils/format';
	import { Input, Rupiah } from '@ui/input';
	import Select from '@ui/input/select.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		error?: ErrorZod<typeof transaksiSchema.create>;
		values?: Transaksi[];
	}
	let { error, values }: Props = $props();

	const optionsAkun = $derived($listAkun.result.data.map((d) => [d.code + '-' + d.name, d.id]));

	let tanggal = $state(formatDateInput(values?.[1]?.tanggal ?? new Date()));

	const kode = $derived(
		Number(tanggal.toString().replaceAll('-', '')) * 1000 +
			(($listTransaksi.result.count ?? 0) / 2 + 1)
	);
</script>

<input type="text" name="id0" value={values?.[0]?.id} hidden />
<input type="text" name="id1" value={values?.[1]?.id} hidden />

<div class="grid gap-2">
	<Input
		bind:value={tanggal}
		errors={error?.errors?.tanggal}
		name="tanggal"
		label="Tanggal"
		type="date"
	/>
	<Input
		value={values?.[1]?.code ?? 'T' + kode}
		errors={error?.errors?.code}
		name="code"
		label="Kode"
		readonly
	/>

	<Select
		value={values?.[0]?.akun_id}
		errors={error?.errors?.akun_id0}
		name="akun_id0"
		label="Kredit"
		options={optionsAkun}
	/>
	<Select
		value={values?.[1]?.akun_id}
		errors={error?.errors?.akun_id1}
		name="akun_id1"
		label="Debit"
		options={optionsAkun}
	/>

	<Input value={values?.[1]?.desc} errors={error?.errors?.desc} name="desc" label="Uraian" />
	<Rupiah value={values?.[1]?.value} errors={error?.errors?.value} name="value" label="Nilai" />
</div>

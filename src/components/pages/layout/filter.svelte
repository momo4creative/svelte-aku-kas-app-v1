<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { bulanFull } from '$lib/utils/date';
	import Icon from '@iconify/svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		bulan?: number;
		tahun?: number;
	}
	let { bulan, tahun }: Props = $props();

	const tahunIni = new Date().getFullYear();

	function changeFilter() {
		goto(page.url.pathname + '?bulan=' + bulan + '&tahun=' + tahun);
	}
</script>

<section class="my-4 bg-gray-200 px-4 py-2">
	<div class="flex items-center gap-2">
		<span>
			<Icon icon="mdi:filter-outline" />
		</span>

		<select name="bulan" bind:value={bulan} class="rounded px-1" onchange={changeFilter}>
			{#each bulanFull as b, i}
				<option value={i + 1}>{b}</option>
			{/each}
		</select>

		<select name="tahun" bind:value={tahun} class="rounded px-1" onchange={changeFilter}>
			{#each { length: 10 }, i}
				<option value={tahunIni - 5 + i}>{tahunIni - 5 + i}</option>
			{/each}
		</select>
	</div>
</section>

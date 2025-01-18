<script lang="ts">
	import { goto } from '$app/navigation';
	import { listTransaksi } from '$lib/stores/list-store';

	interface Props {}
	let {}: Props = $props();

	function onclick() {}

	const linkMore = $derived.by(() => {
		const p = ($listTransaksi.result.page ?? 0) + 1;
		const l = $listTransaksi.result.limit ?? 10;
		return `?p=${p}&l=${l}`;
	});
</script>

<div class="my-2 text-center">
	<a
		href={linkMore}
		data-sveltekit-noscroll
		{onclick}
		class="rounded bg-gray-200 px-2 py-1 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
		>More</a
	>
</div>

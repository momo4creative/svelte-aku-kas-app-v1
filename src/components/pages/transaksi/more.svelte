<script lang="ts">
	import { listTransaksi } from '$lib/stores/list-store';
	import cn from '$lib/utils/cn';

	interface Props {}
	let {}: Props = $props();

	function onclick() {}

	const linkMore = $derived.by(() => {
		const p = ($listTransaksi.result.page ?? 0) + 1;
		const l = $listTransaksi.result.limit ?? 10;
		return `?p=${p}&l=${l}`;
	});

	const disabled = $derived(!$listTransaksi.result.more);
</script>

<div class="my-4 text-center">
	<a
		href={linkMore}
		data-sveltekit-noscroll
		aria-disabled={disabled}
		{onclick}
		class={cn('rounded bg-gray-200 px-2 py-1 text-gray-500 hover:bg-gray-300 hover:text-gray-700', {
			'pointer-events-none': disabled
		})}
	>
		More
	</a>
</div>

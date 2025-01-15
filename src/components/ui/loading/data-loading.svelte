<script lang="ts">
	import { aksi } from '$lib/share/list.svelte';
	import Spinner from './spinner.svelte';

	interface Props {
		isLoading?: boolean;
	}
	let { isLoading }: Props = $props();
</script>

{#if isLoading || aksi.loading}
	<section class="fixed inset-0 top-0 z-50 pt-24">
		<Spinner />
	</section>
{/if}

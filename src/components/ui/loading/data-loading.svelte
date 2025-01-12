<script lang="ts">
	import Spinner from './spinner.svelte';

	interface Props {
		isLoading?: boolean;
	}
	let { isLoading }: Props = $props();
</script>

{#if isLoading}
	<section class="fixed inset-x-0 top-16 z-50">
		<Spinner />
	</section>
{/if}

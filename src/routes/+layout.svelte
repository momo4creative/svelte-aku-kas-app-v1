<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import DataLoading from '@ui/loading/data-loading.svelte';
	import { navigating } from '$app/state';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<title>AKUKAS-APP</title>
</svelte:head>

{@render children()}

<DataLoading isLoading={!!navigating.from} />

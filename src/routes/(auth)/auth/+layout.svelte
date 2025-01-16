<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="my-6 text-center">
	<h1 class="text-4xl font-bold">AKUKAS-APP</h1>
</div>

{@render children()}

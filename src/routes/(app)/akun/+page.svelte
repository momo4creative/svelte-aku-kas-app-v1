<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import List from '@pages/akun/list.svelte';
	import { list } from '$lib/share/list.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="Akun" />

<List values={list.akun.result.data} />

<FloatBtn href="/akun" />

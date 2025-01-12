<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import { list } from '$lib/share/list.svelte';
	import List from '@pages/beranda/list.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="AKUKAS-APP" />

<FloatBtn />

<List values={list.akun.result.data} />

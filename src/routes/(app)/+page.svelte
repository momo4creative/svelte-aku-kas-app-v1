<script lang="ts">
	import Header from '@pages/layout/header.svelte';
	import type { PageData } from './$types';
	import FloatBtn from '@pages/layout/float-btn.svelte';
	import { list } from '$lib/share/list.svelte';
	import List from '@pages/beranda/list.svelte';
	import Filter from '@pages/layout/filter.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Header title="AKUKAS-APP" />
<Filter bulan={data.bulan} tahun={data.tahun} />

<List values={list.akun.result.data} />
<FloatBtn />

<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut magnam perspiciatis repellendus
	officiis earum inventore deleniti quia illo totam? Impedit possimus aliquid, labore sapiente magni
	enim exercitationem. Deleniti magni officiis, nulla nisi architecto recusandae odio cum illo
	illum? Placeat in sit facere dolores minima consequuntur error, est tempore odit odio harum.
	Explicabo commodi ipsa hic mollitia perspiciatis exercitationem quis sed perferendis corrupti
	quaerat quisquam eligendi ad beatae necessitatibus, facilis saepe placeat in fugit suscipit
	assumenda sunt tenetur! Voluptatem alias possimus consectetur iste et. Consequuntur minus
	accusamus dolor vel, voluptatum perspiciatis cumque, quis libero corporis sapiente fugit sunt
	laborum maxime.
</p>

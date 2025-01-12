<script lang="ts">
	import Form from '@pages/auth/form-auth.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Form title="Register" />

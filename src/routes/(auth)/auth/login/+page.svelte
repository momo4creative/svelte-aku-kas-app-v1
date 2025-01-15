<script lang="ts">
	import Form from '@pages/auth/form-auth.svelte';
	import type { PageData } from './$types';
	import Alert from '@ui/message/alert.svelte';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	const { message, status } = data;
</script>

<Form title="Login" isLogin onSuccess={() => goto('/')}>
	{#if message}
		<Alert {message} {status} class="p-0" />
	{/if}
</Form>

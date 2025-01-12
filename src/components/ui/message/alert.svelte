<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	interface Props extends HTMLBaseAttributes, ErrorZod {}
	let { message, errors, status, class: className }: Props = $props();

	if (status == 401) {
		goto('/auth/login?msg=Silakan login terlebih dahulu !');
	}

	function getIcon() {
		if (!status) return 'exclamation-thick';
		if (status >= 400) return 'close-thick';
		return 'check-thick';
	}

	onDestroy(() => {
		message = undefined;
	});
</script>

{#if message}
	<section class={cn('my-6 px-4', className)}>
		<div
			class={cn(
				'relative rounded border-2 px-4 py-2 ps-10 shadow-md',
				'border-yellow-200 bg-yellow-100 text-yellow-600',
				{
					'border-green-200 bg-green-100 text-green-500': status && status >= 200,
					'border-red-200 bg-red-100 text-red-500': status && status >= 400
				}
			)}
		>
			<span class="absolute left-2 rounded-full">
				<Icon icon="mdi:{getIcon()}" width="24" class="" />
			</span>
			<p class="font-medium">{message}</p>
			{#if errors}
				{#each Object.entries(errors) as [label, text]}
					<p>{label} : {text}</p>
				{/each}
			{/if}
		</div>
	</section>
{/if}

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/state';
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import { aksi } from '$lib/share/list.svelte';
	import cn from '$lib/utils/cn';
	import { handleSubmit, type CallbackSubmit } from '$lib/utils/handle-submit';
	import Button from '@ui/button/button.svelte';
	import Alert from '@ui/message/alert.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		title: string;
		action: string;
		childrenSnippet?: Snippet<[typeof error]>;
		redirect: string;
		invalidation?: boolean;
	}
	let {
		children,
		invalidation = true,
		childrenSnippet,
		title,
		action,
		redirect,
		...props
	}: Props = $props();

	let error = $state<ErrorZod>();

	const redirectTo1 = $derived(page.url.searchParams.get('redirectTo'));
	const goBack = () => goto(redirectTo1 || redirect);

	const callback: CallbackSubmit = {
		loading: (val) => (aksi.loading = val),
		failure: (err) => (error = err),
		success: async () => {
			aksi.loading = true;
			if (invalidation) await invalidate('base:layout');
			aksi.loading = false;
			goBack();
		}
	};
</script>

<div class="relative">
	<Alert {...error} />

	<form
		{action}
		method="post"
		{...props}
		use:enhance={({ formElement }) => (
			formElement['btn-submit'].focus(), handleSubmit(title, callback)
		)}
		class={cn('grid gap-4', props.class)}
	>
		{@render children?.()}
		{@render childrenSnippet?.(error)}

		<footer class="flex flex-wrap items-center gap-1">
			<Button id="btn-submit" type="submit">{title.split(' ')[0] ?? 'Simpan'}</Button>
			<Button type="reset">Reset</Button>
			<Button onclick={goBack}>Batal</Button>
		</footer>
	</form>
</div>

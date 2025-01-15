<script lang="ts">
	import { enhance } from '$app/forms';
	import type { authSchema } from '$lib/schema/auth';
	import type { ErrorZod } from '$lib/schema/parce-zod';
	import { aksi } from '$lib/share/list.svelte';
	import cn from '$lib/utils/cn';
	import { handleSubmit, type CallbackSubmit } from '$lib/utils/handle-submit';
	import Button from '@ui/button/button.svelte';
	import { Input } from '@ui/input';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		title: string;
		error?: ErrorZod<typeof authSchema.register>;
		isLogin?: boolean;
		onSuccess?: () => void;
	}
	let { error, title, onSuccess, children, isLogin, ...props }: Props = $props();

	const callback: CallbackSubmit = {
		loading: (val) => (aksi.loading = val),
		failure: (err) => (error = err),

		success: () => {
			if (onSuccess) onSuccess();
		}
	};
</script>

{#snippet field()}
	<div class="grid gap-2">
		<Input
			errors={error?.errors?.username}
			name="username"
			label="Username"
			autocomplete="username"
		/>
		<Input
			errors={error?.errors?.password}
			name="password"
			label="Password"
			type="password"
			autocomplete="current-password"
		/>
		{#if !isLogin}
			<Input
				errors={error?.errors?.confirmPassword}
				name="confirmPassword"
				label="Confirm Password"
				type="password"
			/>
		{/if}
	</div>
{/snippet}

<div class="relative mx-auto my-6 max-w-sm px-4">
	<h1 class="my-4 text-center text-4xl font-bold">{title}</h1>

	{@render children?.()}

	<form
		action="/auth?/{isLogin ? 'login' : 'register'}"
		method="post"
		{...props}
		use:enhance={({ formElement }) => (
			formElement['btn-submit'].focus(), handleSubmit(title, callback)
		)}
		class={cn('grid gap-4', props.class)}
	>
		{@render field()}

		<Button id="btn-submit" type="submit">{isLogin ? 'Login' : 'Register'}</Button>
	</form>

	<a
		href="/auth/{isLogin ? 'register' : 'login'}"
		class="my-2 block w-full text-center text-gray-400 hover:text-inherit"
		>{isLogin ? 'Register' : 'Login'} here !</a
	>
</div>

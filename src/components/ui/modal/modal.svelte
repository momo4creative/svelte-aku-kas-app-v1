<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		isOpen?: boolean;
		footer?: Snippet;
	}
	let { children, title, footer, isOpen = $bindable() }: Props = $props();
</script>

{#if isOpen}
	<div transition:fade class="fixed inset-0 z-40 bg-black/20">
		<section class="absolute inset-8">
			<div
				transition:fly={{ y: -20 }}
				class="flex max-h-full flex-col overflow-hidden rounded-md border bg-white shadow-lg"
			>
				{#if title}
					<header>
						<h1 class="bg-gray-100 px-4 py-2 text-2xl font-bold">{title}</h1>
					</header>
				{/if}

				<main class="max-h-full overflow-y-auto">
					{@render children?.()}
				</main>

				{@render footer?.()}
			</div>
		</section>
	</div>
{/if}

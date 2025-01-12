<script lang="ts">
	interface Props {
		errors?: string[];
	}
	let { errors }: Props = $props();
</script>

<div class="px-2 text-sm tracking-wider text-red-500">{errors?.join(' ')}</div>

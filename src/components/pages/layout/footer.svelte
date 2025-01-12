<script lang="ts">
	const yearNow = new Date().getFullYear();
	const year = '2025' + (yearNow == 2025 ? '' : ' - ' + yearNow);

	const version = '0.1.1';
</script>

<footer class="sticky bottom-0 z-10 bg-gradient-to-t from-gray-200 pt-8">
	<div class="flex justify-between bg-gray-200 px-4 py-0.5 font-mono text-sm">
		<span>&copy; {year} by MomoCreative</span>
		<span>v {version}</span>
	</div>
</footer>

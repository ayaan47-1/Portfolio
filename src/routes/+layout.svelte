<script lang="ts">
	import '../app.css';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<style>
		/* System Futura font will be used via CSS fallbacks */
	</style>
</svelte:head>

{@render children()}

<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CursorTrail from '$lib/components/CursorTrail.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import ChatWidget from '$lib/components/ChatWidget.svelte';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
	<style>
		/* System Futura font will be used via CSS fallbacks */
	</style>
</svelte:head>

<CursorTrail />
<ThemeToggle />
<Terminal />
<ChatWidget />
{@render children()}

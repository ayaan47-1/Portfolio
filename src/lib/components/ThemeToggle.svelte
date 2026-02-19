<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(true);

	onMount(() => {
		// Read saved preference
		const saved = localStorage.getItem('theme');
		if (saved === 'light') {
			isDark = false;
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			isDark = true;
			document.documentElement.removeAttribute('data-theme');
		}
	});

	function toggle() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.removeAttribute('data-theme');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<button
	onclick={toggle}
	aria-label="Toggle light/dark mode"
	class="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center border border-border bg-surface/80 backdrop-blur-sm text-text-secondary hover:text-accent hover:border-accent transition-all duration-200 shadow-sm"
>
	{#if isDark}
		<!-- Sun icon -->
		<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="5"/>
			<line x1="12" y1="1" x2="12" y2="3"/>
			<line x1="12" y1="21" x2="12" y2="23"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
			<line x1="1" y1="12" x2="3" y2="12"/>
			<line x1="21" y1="12" x2="23" y2="12"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
		</svg>
	{:else}
		<!-- Moon icon -->
		<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	{/if}
</button>

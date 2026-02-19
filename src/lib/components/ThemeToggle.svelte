<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, MoonStar } from 'lucide-svelte';

	let isDark = $state(true);
    // ... existing logic ...
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
	class="fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border border-border bg-surface/80 backdrop-blur-sm text-text-secondary hover:text-accent hover:border-accent transition-all duration-300 shadow-lg hover:shadow-accent/20 group"
>
	<div class="relative w-6 h-6">
		<div class="absolute inset-0 transition-transform duration-500 rotate-0 scale-100 {isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100'}">
			<Sun class="w-6 h-6" />
		</div>
		<div class="absolute inset-0 transition-transform duration-500 rotate-90 scale-50 {isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0'}">
			<MoonStar class="w-6 h-6" />
		</div>
	</div>
</button>

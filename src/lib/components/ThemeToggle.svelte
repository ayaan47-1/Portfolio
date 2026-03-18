<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(true);
	let animating = $state(false);

	onMount(() => {
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
		animating = true;
		isDark = !isDark;
		if (isDark) {
			document.documentElement.removeAttribute('data-theme');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
		setTimeout(() => (animating = false), 600);
	}
</script>

<button
	onclick={toggle}
	aria-label="Toggle light/dark mode"
	class="fixed top-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center
	       border border-border bg-surface/80 backdrop-blur-sm
	       hover:border-accent transition-all duration-300 shadow-lg
	       hover:shadow-[0_0_16px_var(--color-accent)/30] group"
	class:spin={animating}
>
	{#if isDark}
		<!-- Dark mode: sparkle/stars icon -->
		<svg
			viewBox="0 0 24 24" width="18" height="18" fill="none"
			class="text-accent transition-all duration-300"
			aria-hidden="true"
		>
			<!-- Centre star -->
			<path
				d="M12 2 L13.2 9.8 L21 12 L13.2 14.2 L12 22 L10.8 14.2 L3 12 L10.8 9.8 Z"
				stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"
				fill="none"
			/>
			<!-- Small top-right spark -->
			<circle cx="19" cy="5" r="1" fill="currentColor" opacity="0.7" />
			<!-- Small bottom-left spark -->
			<circle cx="5" cy="19" r="0.8" fill="currentColor" opacity="0.5" />
		</svg>
	{:else}
		<!-- Light mode: sun with animated rays -->
		<svg
			viewBox="0 0 24 24" width="18" height="18" fill="none"
			class="text-accent transition-all duration-300"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
			<!-- 8 rays -->
			<line x1="12" y1="2"   x2="12" y2="4.5"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="12" y1="19.5" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="2"  y1="12"  x2="4.5"  y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="19.5" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="5.5"  y1="5.5"  x2="7.2"  y2="7.2"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="16.8" y1="16.8" x2="18.5" y2="18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="18.5" y1="5.5"  x2="16.8" y2="7.2"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="7.2"  y1="16.8" x2="5.5"  y2="18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	{/if}
</button>

<style>
	@keyframes spinOnce {
		from { transform: rotate(0deg) scale(1); }
		50%  { transform: rotate(180deg) scale(0.8); }
		to   { transform: rotate(360deg) scale(1); }
	}

	.spin {
		animation: spinOnce 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
</style>

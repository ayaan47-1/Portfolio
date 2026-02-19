<script lang="ts">
	import { onMount } from 'svelte';

	let activeSection = $state('home');

	// Smooth scroll and active state observer
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.5 } // Adjust threshold as needed
		);

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			activeSection = id; // Optimistic update
		}
	}

	const links = [
		{ id: 'home', label: 'Home' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'work-experience', label: 'Experience' },
		{ id: 'systems-thinking', label: 'Systems' }
	];
</script>

<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
	<div class="flex items-center gap-1 p-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 shadow-2xl ring-1 ring-white/5">
		{#each links as link}
			<button
				onclick={() => scrollTo(link.id)}
				class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative group
				{activeSection === link.id ? 'text-text-primary bg-white/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'}"
			>
				{link.label}
				
				<!-- Active/Hover Glow -->
				{#if activeSection === link.id}
					<span class="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] pointer-events-none"></span>
				{/if}
			</button>
		{/each}
	</div>
</nav>

<style>
	/* Animation for initial load */
	@keyframes fadeInUp {
		from { opacity: 0; transform: translate(-50%, 20px); }
		to { opacity: 1; transform: translate(-50%, 0); }
	}
	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
		animation-delay: 0.5s; /* Wait for other content */
		opacity: 0; /* Start hidden */
	}
</style>

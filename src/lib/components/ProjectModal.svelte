<script lang="ts">
	import type { Project } from '$lib/types';
	import { ExternalLink, X, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface Props {
		project: Project | null;
		onclose: () => void;
	}

	const { project, onclose }: Props = $props();

	onMount(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onclose();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

{#if project}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
		onclick={(e) => { if (e.target === e.currentTarget) onclose(); }}
		role="dialog"
		aria-modal="true"
		aria-label={project.name}
	>
		<!-- Panel -->
		<div
			class="relative w-full max-w-2xl rounded-2xl border border-border overflow-hidden shadow-2xl"
			style="background-color: rgb(var(--color-surface-channels) / 0.98);"
		>
			<!-- Header -->
			<div class="flex items-start justify-between p-6 pb-4 border-b border-white/5">
				<div>
					<div class="flex items-center gap-2 mb-1">
						<h2 class="font-futura text-2xl font-bold text-text-primary">
							{project.name}
						</h2>
						{#if project.status}
							<span class="text-xs text-accent font-mono px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10">
								{project.status}
							</span>
						{/if}
					</div>
					{#if project.link}
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent-glow transition-colors"
						>
							<ExternalLink class="w-3 h-3" />
							{project.link.replace(/^https?:\/\//, '')}
						</a>
					{/if}
				</div>
				<button
					onclick={onclose}
					class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all shrink-0 ml-4"
					aria-label="Close"
				>
					<X class="w-4 h-4" />
				</button>
			</div>

			<!-- Bullets -->
			<div class="p-6 pb-4">
				<p class="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">What I built</p>
				<ul class="space-y-3">
					{#each project.bullets as bullet}
						<li class="flex gap-3 group">
							<ChevronRight class="w-4 h-4 text-accent shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
							<span class="text-sm text-text-secondary leading-relaxed">{bullet}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Tech stack -->
			<div class="px-6 pb-6 pt-2 border-t border-white/5 mt-2">
				<p class="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Stack</p>
				<div class="flex flex-wrap gap-2">
					{#each project.tech.split(', ') as tag}
						<span class="px-2.5 py-1 text-xs font-mono bg-accent/8 border border-accent/20 rounded-md text-accent">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

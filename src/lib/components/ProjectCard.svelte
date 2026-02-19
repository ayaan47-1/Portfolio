<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();

	const glowStyle = $derived(
		project.glowColor ? `text-shadow: 0 0 10px rgb(var(--color-accent-channels) / 0.5), 0 0 20px rgb(var(--color-accent-channels) / 0.3);` : ''
	);
</script>

<article class="card-glow rounded-lg p-6 md:p-7 slide-up group backdrop-blur-sm text-text-primary" style="background-color: rgb(var(--color-surface-channels) / 0.8);">
	<h3 class="font-futura text-xl md:text-2xl font-semibold text-text-primary mb-3 group-hover:text-accent-glow transition-colors duration-300">
		{#if project.link}
			<a
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
				class="transition-all duration-300 {project.glowColor ? 'project-glow' : ''}"
				style={glowStyle}
			>
				{project.name}
			</a>
		{:else}
			{project.name}
		{/if}
		{#if project.status}
			<span class="text-sm text-accent ml-2 font-mono">({project.status})</span>
		{/if}
	</h3>

	<ul class="space-y-2.5 mb-4 list-disc list-outside ml-5 marker:text-accent">
		{#each project.bullets as bullet}
			<li class="text-text-secondary leading-relaxed">{bullet}</li>
		{/each}
	</ul>

	<p class="text-sm text-text-muted font-mono border-t border-border pt-3 mt-2">
		{project.tech}
	</p>
</article>

<style>
	.project-glow:hover {
		text-shadow: 0 0 15px rgb(var(--color-accent-channels) / 0.8), 0 0 25px rgb(var(--color-accent-channels) / 0.5), 0 0 35px rgb(var(--color-accent-channels) / 0.3);
	}
</style>

<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();
</script>

<article class="bg-surface card-glow rounded-lg p-6 md:p-7 slide-up group">
	<h3 class="font-futura text-xl md:text-2xl font-semibold text-text-primary mb-3 group-hover:text-accent-glow transition-colors duration-300">
		{project.name}
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

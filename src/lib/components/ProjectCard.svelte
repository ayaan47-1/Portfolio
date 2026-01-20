<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();
</script>

<article class="bg-surface border border-border rounded-lg p-6 md:p-8 hover-lift">
	<h3 class="font-mono text-xl md:text-2xl font-semibold text-text-primary mb-4">
		{project.name}
		{#if project.status}
			<span class="text-sm text-accent ml-2">({project.status})</span>
		{/if}
	</h3>

	<ul class="space-y-3 mb-4 list-disc list-outside ml-5">
		{#each project.bullets as bullet}
			<li class="text-text-secondary leading-relaxed">{bullet}</li>
		{/each}
	</ul>

	<p class="text-sm text-text-muted">
		{project.tech}
	</p>
</article>

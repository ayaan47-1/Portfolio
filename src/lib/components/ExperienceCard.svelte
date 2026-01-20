<script lang="ts">
	import type { WorkExperience } from '$lib/types';

	interface Props {
		experience: WorkExperience;
	}

	const { experience }: Props = $props();
</script>

<article class="bg-surface card-glow rounded-lg p-6 md:p-7 slide-up group">
	<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
		<div>
			<h3 class="font-futura text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent-glow transition-colors duration-300">
				{experience.position}
			</h3>
			<p class="text-accent font-medium text-base md:text-lg mt-1">
				{experience.company}
			</p>
		</div>
		<div class="text-sm text-text-muted font-mono md:text-right">
			<p>{experience.location}</p>
			<p class="text-accent-glow">{experience.period}</p>
		</div>
	</div>

	<ul class="space-y-2.5 list-disc list-outside ml-5 marker:text-accent">
		{#each experience.bullets as bullet}
			<li class="text-text-secondary leading-relaxed">{bullet}</li>
		{/each}
	</ul>
</article>

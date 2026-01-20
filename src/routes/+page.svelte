<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { personalInfo, projects, systemsThinking } from '$lib/data';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />

	<!-- Open Graph -->
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data.meta.url} />
	<meta property="og:image" content={data.meta.ogImage} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={data.meta.ogImage} />
</svelte:head>

<!-- Hero Section -->
<section class="py-24 md:py-32">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<h1 class="font-mono text-4xl md:text-6xl font-bold text-text-primary mb-4">
			{personalInfo.name}
		</h1>
		<p class="text-xl md:text-2xl text-accent font-medium mb-6">
			{personalInfo.title}
		</p>
		<p class="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl leading-relaxed">
			{personalInfo.valueLine}
		</p>

		<div class="space-y-3 text-text-secondary mb-8">
			<p class="flex items-center gap-2">
				<span>📍</span>
				<span>{personalInfo.location}</span>
			</p>
			<p class="flex items-center gap-2">
				<span>✉️</span>
				<a href="mailto:{personalInfo.email}" class="link hover:text-accent">
					{personalInfo.email}
				</a>
			</p>
		</div>

		<div class="flex flex-wrap gap-6 text-text-secondary">
			<a
				href={personalInfo.github}
				target="_blank"
				rel="noopener noreferrer"
				class="link hover:text-accent"
			>
				GitHub →
			</a>
			<a
				href={personalInfo.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="link hover:text-accent"
			>
				LinkedIn →
			</a>
			<a href="/Ayaan_Ahmed_Khan_Resume.pdf" target="_blank" class="link hover:text-accent">
				Resume →
			</a>
		</div>
	</div>
</section>

<!-- Projects Section -->
<Section title="Projects" id="projects">
	<div class="grid gap-6 md:gap-8">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</Section>

<!-- Systems Thinking Section -->
<Section title="Systems Thinking" id="systems-thinking">
	<ol class="space-y-6">
		{#each systemsThinking as item, index}
			<li class="flex gap-4">
				<span class="font-mono text-accent font-semibold min-w-[3rem]">
					{String(index + 1).padStart(2, '0')}.
				</span>
				<span class="text-text-secondary leading-relaxed">{item}</span>
			</li>
		{/each}
	</ol>
</Section>

<!-- Footer -->
<footer class="border-t border-border py-12">
	<div class="mx-auto max-w-4xl px-6 md:px-8 text-center text-sm text-text-muted">
		<p>&copy; {new Date().getFullYear()} {personalInfo.name}</p>
		<p class="mt-2">Built with SvelteKit</p>
	</div>
</footer>

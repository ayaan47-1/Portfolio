<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import NowCards from '$lib/components/NowCards.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { MapPin, Mail, GraduationCap, ArrowUp, Briefcase, BookOpen } from 'lucide-svelte';
	import { personalInfo, projects, workExperience, systemsThinking, nowWatching, nowBuilding, nowUsing } from '$lib/data';

	/* Scroll to Top logic */
	let showScroll = $state(false);
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	} 
	
	const { data } = $props();
</script>

<svelte:window onscroll={() => showScroll = window.scrollY > 500} />

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data.meta.url} />
	<meta property="og:image" content={data.meta.ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={data.meta.ogImage} />
</svelte:head>

<!-- Floating Navbar -->
<Navbar />

<!-- Scroll to Top Button -->
<button
	onclick={scrollToTop}
	class="fixed bottom-20 right-6 md:bottom-6 z-50 p-3 rounded-full bg-surface/80 backdrop-blur-sm border border-border text-text-secondary hover:text-accent hover:border-accent shadow-lg transition-all duration-300 transform {showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
	aria-label="Scroll to top"
>
	<ArrowUp class="w-6 h-6" />
</button>

<!-- Hero Section -->
<section id="home" class="pt-16 pb-8 md:pt-20 md:pb-12">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<h1 class="font-futura text-5xl md:text-7xl font-bold mb-4 gradient-text">
			{personalInfo.name}
		</h1>
		<p class="text-2xl md:text-3xl text-text-primary font-futura font-medium mb-2">
			{personalInfo.title}
		</p>
		<p class="text-base md:text-lg text-text-secondary mb-4 max-w-2xl leading-relaxed">
			{personalInfo.valueLine}
		</p>
		<div class="space-y-3 text-text-secondary mt-6 mb-6">
			<p class="flex items-center gap-3 text-base">
				<MapPin class="w-5 h-5 text-accent" />
				<span>{personalInfo.location}</span>
			</p>
			<p class="flex items-center gap-3 text-base">
				<Mail class="w-5 h-5 text-accent" />
				<a href="mailto:{personalInfo.email}" class="link hover:text-accent-glow transition-all">
					{personalInfo.email}
				</a>
			</p>
		</div>

		<div class="flex flex-wrap gap-6 text-base font-medium mb-8">
			<a
				href={personalInfo.github}
				target="_blank"
				rel="noopener noreferrer"
				class="link text-text-secondary hover:text-accent-glow transition-all flex items-center gap-2 group"
			>
				<svg class="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
				</svg>
				GitHub
			</a>
			<a
				href={personalInfo.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="link text-text-secondary hover:text-accent-glow transition-all flex items-center gap-2 group"
			>
				<svg class="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
					<circle cx="4" cy="4" r="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
				</svg>
				LinkedIn
			</a>
			<a href="/Ayaan_Ahmed_Khan_Resume.pdf" target="_blank" class="link text-text-secondary hover:text-accent-glow transition-all flex items-center gap-2 group">
				<svg class="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
				</svg>
				Resume
			</a>
		</div>

		<NowCards watching={nowWatching} building={nowBuilding} using={nowUsing} />
	</div>
</section>

<!-- Separator -->
<div class="max-w-4xl mx-auto px-6 md:px-8 py-4">
	<div class="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 shadow-[0_0_10px_theme('colors.accent')]"></div>
</div>

<!-- About Me Section -->
<Section title="About Me" id="about">
	<div class="space-y-8">
		{#if personalInfo.motivation}
			<p class="text-lg md:text-xl text-text-primary font-medium leading-relaxed max-w-3xl">
				{personalInfo.motivation}
			</p>
		{/if}

		<!-- Education Card -->
		<article class="card-glow rounded-xl p-6 md:p-8 backdrop-blur-sm text-text-primary" style="background-color: rgb(var(--color-surface-channels) / 0.8);">
			{#if personalInfo.education}
				<div>
					<div class="flex items-center gap-2 mb-6">
						<GraduationCap class="w-6 h-6 text-accent" />
						<h3 class="font-futura text-xl md:text-2xl font-bold text-text-primary">Education</h3>
					</div>
					
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                        <div>
                            <h3 class="font-futura text-xl md:text-2xl font-semibold text-text-primary">
                                {personalInfo.education.degree}
                            </h3>
							{#if personalInfo.education.minor}
								<p class="font-futura text-lg md:text-xl font-medium text-text-secondary mt-1">
									{personalInfo.education.minor}
								</p>
							{/if}
                            <p class="text-accent font-medium text-base md:text-lg mt-1">
                                {personalInfo.education.university}
                            </p>
							
							{#if personalInfo.education.relevantCoursework}
								<div class="mt-4 pt-4 border-t border-white/5 w-full">
									<h4 class="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
										<BookOpen class="w-4 h-4 text-accent" />
										Relevant Coursework
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each personalInfo.education.relevantCoursework as course}
											<span class="px-2 py-1 text-xs font-medium bg-surface/50 border border-white/10 rounded-md text-text-secondary hover:text-accent hover:border-accent/30 transition-colors cursor-default">
												{course}
											</span>
										{/each}
									</div>
								</div>
							{/if}
                        </div>
                        <div class="text-sm text-text-muted font-mono md:text-right mt-1.5 shrink-0 whitespace-nowrap">
                            <p>Chicago, Illinois</p>
                            <p class="text-accent-glow">{personalInfo.education.year}</p>
                        </div>
                    </div>
				</div>
			{/if}
		</article>

		<!-- Experience Card -->
		<article id="work-experience" class="card-glow rounded-xl p-6 md:p-8 backdrop-blur-sm text-text-primary scroll-mt-24" style="background-color: rgb(var(--color-surface-channels) / 0.8);">
			<div class="flex items-center gap-2 mb-8">
				<Briefcase class="w-6 h-6 text-accent" />
				<h3 class="font-futura text-xl md:text-2xl font-bold text-text-primary">Experience</h3>
			</div>

			{#each workExperience as experience, index}
				{#if index > 0}
					<!-- Separator between experiences -->
					<div class="h-px bg-white/5 my-8"></div>
				{/if}

				<div>
					<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
						<div>
							<h3 class="font-futura text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent-glow transition-colors duration-300">
								{experience.position}
							</h3>
							<p class="text-accent font-medium text-base md:text-lg mt-1">
								{#if experience.link}
									<a 
										href={experience.link} 
										target="_blank" 
										rel="noopener noreferrer"
										class="hover:text-accent-glow hover:underline underline-offset-4 decoration-accent/30 transition-all"
									>
										{experience.company}
									</a>
								{:else}
									{experience.company}
								{/if}
							</p>
						</div>
						<div class="text-sm text-text-muted font-mono md:text-right mt-1.5 shrink-0 whitespace-nowrap">
							<p>{experience.location}</p>
							<p class="text-accent-glow">{experience.period}</p>
						</div>
					</div>

					<ul class="space-y-2.5 list-disc list-outside ml-5 marker:text-accent">
						{#each experience.bullets as bullet}
							<li class="text-text-secondary leading-relaxed">{bullet}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</article>
	</div>
</Section>

<!-- Projects Section -->
<Section title="Projects" id="projects">
	<div class="grid gap-6 md:gap-7">
		{#each projects as project, index}
			<div class="delay-{index * 100}">
				<ProjectCard {project} />
			</div>
		{/each}
	</div>
</Section>

<!-- Systems Thinking Section -->
<Section title="Systems Thinking" id="systems-thinking">
	<ol class="space-y-5">
		{#each systemsThinking as item, index}
			<li class="flex gap-4 group slide-up delay-{index * 100}">
				<span class="font-mono text-accent-glow font-bold min-w-[3rem] text-lg group-hover:text-accent transition-colors">
					{String(index + 1).padStart(2, '0')}.
				</span>
				<span class="text-text-secondary leading-relaxed text-base">{item}</span>
			</li>
		{/each}
	</ol>
</Section>

<footer class="border-t border-accent-muted/30 py-10 md:py-12 mt-8">
	<div class="mx-auto max-w-4xl px-6 md:px-8 text-center text-sm text-text-muted">
		<p>&copy; {new Date().getFullYear()} {personalInfo.name}</p>
		<p class="mt-2 font-mono">Built with <span class="text-accent">SvelteKit</span></p>
	</div>
</footer>

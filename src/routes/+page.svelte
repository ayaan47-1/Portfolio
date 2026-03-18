<script lang="ts">
	import { onMount } from 'svelte';
	import NowCards from '$lib/components/NowCards.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import ProjectModal from '$lib/components/ProjectModal.svelte';
	import { MapPin, Mail, GraduationCap, ChevronDown } from 'lucide-svelte';
	import type { Project } from '$lib/types';
	import {
		personalInfo,
		projects,
		workExperience,
		systemsThinking,
		nowWatching,
		nowBuilding,
		nowUsing
	} from '$lib/data';

	const { data } = $props();

	let scrollEl = $state<HTMLElement | null>(null);
	let activeIdx = $state(0);

	const sectionIds = ['home', 'about', 'experience', 'projects', 'systems-thinking'];
	const sectionLabels = ['Home', 'About', 'Work', 'Projects', 'Systems'];

	// Chicago live clock
	let now = $state(new Date());

	let chicagoTimeStr = $derived(
		new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/Chicago',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		}).format(now)
	);

	let clockH = $derived(
		parseInt(
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'America/Chicago',
				hour: 'numeric',
				hour12: false
			}).format(now)
		)
	);
	let clockM = $derived(
		parseInt(
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'America/Chicago',
				minute: 'numeric'
			}).format(now)
		)
	);
	let clockS = $derived(
		parseInt(
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'America/Chicago',
				second: 'numeric'
			}).format(now)
		)
	);

	let hourDeg = $derived((clockH % 12) * 30 + clockM * 0.5);
	let minuteDeg = $derived(clockM * 6 + clockS * 0.1);
	let secondDeg = $derived(clockS * 6);

	onMount(() => {
		const tick = setInterval(() => (now = new Date()), 1000);

		if (!scrollEl) return () => clearInterval(tick);
		const els = Array.from(scrollEl.querySelectorAll('.snap-section'));
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting && e.intersectionRatio >= 0.5) {
						const idx = sectionIds.indexOf((e.target as HTMLElement).id);
						if (idx !== -1) activeIdx = idx;
					}
				});
			},
			{ root: scrollEl, threshold: 0.5 }
		);
		els.forEach((el) => obs.observe(el));
		return () => {
			clearInterval(tick);
			obs.disconnect();
		};
	});

	function scrollToSection(idx: number) {
		document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: 'smooth' });
	}

	// Project modal
	let selectedProject = $state<Project | null>(null);

	// Typewriter cycling
	const TYPE_PHRASES = [
		'building LLM pipelines',
		'designing RAG systems',
		'shipping production AI',
		'playing guitar',
		'watching football'
	];
	let typeText = $state('');
	let typePhrase = $state(0);
	let typeDir = $state<'fwd' | 'back'>('fwd');

	onMount(() => {
		let i = 0;
		const type = () => {
			const phrase = TYPE_PHRASES[typePhrase];
			if (typeDir === 'fwd') {
				typeText = phrase.slice(0, i + 1);
				i++;
				if (i === phrase.length) {
					typeDir = 'back';
					setTimeout(type, 1600);
					return;
				}
			} else {
				typeText = phrase.slice(0, i - 1);
				i--;
				if (i === 0) {
					typeDir = 'fwd';
					typePhrase = (typePhrase + 1) % TYPE_PHRASES.length;
				}
			}
			setTimeout(type, typeDir === 'fwd' ? 60 : 35);
		};
		const tid = setTimeout(type, 800);
		return () => clearTimeout(tid);
	});
</script>

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

<!-- Bottom navbar (mobile) -->
<Navbar />

<!-- Side dot navigation (desktop) -->
<nav
	class="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 hidden md:flex"
	aria-label="Section navigation"
>
	{#each sectionLabels as label, i}
		<button
			class="group flex items-center gap-3 justify-end"
			onclick={() => scrollToSection(i)}
			aria-label={label}
		>
			<span
				class="text-xs font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
			>
				{label}
			</span>
			<span
				class="block rounded-full transition-all duration-300 {activeIdx === i
					? 'w-2.5 h-2.5 bg-accent border-2 border-accent shadow-[0_0_10px_var(--color-accent)]'
					: 'w-2 h-2 bg-transparent border border-text-muted group-hover:border-accent/60'}"
			></span>
		</button>
	{/each}
</nav>

<!-- ─────────────────────────────────────────── -->
<!-- Scroll snap container                       -->
<!-- ─────────────────────────────────────────── -->
<div class="snap-container" bind:this={scrollEl}>

	<!-- ── 01 · Hero ── -->
	<section id="home" class="snap-section relative" class:is-visible={activeIdx === 0}>
		<div class="section-watermark">01</div>

		<!-- Avatar — floated into the right negative space -->
		<div class="hidden md:block absolute right-[27%] top-[8%] w-56 h-56 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(var(--color-accent-channels)/0.25)]">
			<img
				src="/avatar.jpg"
				alt="Ayaan Khan"
				class="w-full h-full object-cover"
				style="object-position: center 45%; transform: scale(1.25); transform-origin: center 45%;"
				onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; (e.currentTarget as HTMLImageElement).nextElementSibling?.setAttribute('style','display:flex'); }}
			/>
			<div class="w-full h-full bg-accent/10 items-center justify-center" style="display:none">
				<span class="font-futura font-bold text-3xl text-accent">AK</span>
			</div>
			<span class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-background"></span>
		</div>

		<div class="section-inner mx-auto w-full max-w-5xl px-6 md:px-12 pt-14 pb-28 md:pt-6 md:pb-20">
			<span class="section-label mb-3 block">Hello</span>

			<h1 class="font-futura text-5xl md:text-6xl lg:text-7xl font-bold mb-2 gradient-text leading-none tracking-tight">
				{personalInfo.name}
			</h1>
			<p class="text-xl md:text-2xl text-text-primary font-futura font-medium mb-1">
				{personalInfo.title}
			</p>
			<!-- Typewriter line -->
			<p class="text-sm text-text-muted font-mono mb-3 h-5">
				<span class="text-accent">›</span>
				<span class="ml-1">{typeText}</span><span class="animate-pulse text-accent">▍</span>
			</p>
			<!-- Open to work badge -->
			<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono mb-4">
				<span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
				open to work
			</span>

			<div class="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
				<span class="flex items-center gap-2">
					<MapPin class="w-4 h-4 text-accent" />{personalInfo.location}
				</span>
				<a href="mailto:{personalInfo.email}" class="link flex items-center gap-2">
					<Mail class="w-4 h-4 text-accent" />{personalInfo.email}
				</a>
				<!-- Chicago live clock -->
				<span class="flex items-center gap-2 font-mono text-text-muted">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" class="text-accent shrink-0" aria-hidden="true">
						<circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.5" />
						<!-- Hour hand -->
						<line
							x1="12" y1="12" x2="12" y2="7.5"
							stroke="currentColor" stroke-width="2" stroke-linecap="round"
							style="transform-origin: 12px 12px; transform: rotate({hourDeg}deg)"
						/>
						<!-- Minute hand -->
						<line
							x1="12" y1="12" x2="12" y2="5"
							stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
							style="transform-origin: 12px 12px; transform: rotate({minuteDeg}deg)"
						/>
						<!-- Second hand -->
						<line
							x1="12" y1="13.5" x2="12" y2="4.5"
							stroke="var(--color-accent-glow)" stroke-width="1" stroke-linecap="round"
							style="transform-origin: 12px 12px; transform: rotate({secondDeg}deg)"
						/>
						<!-- Center dot -->
						<circle cx="12" cy="12" r="1.2" fill="currentColor" />
					</svg>
					<span class="text-xs tracking-wider">{chicagoTimeStr} <span class="text-text-muted/60">CST</span></span>
				</span>
			</div>

			<div class="flex flex-wrap gap-5 text-sm font-medium mb-5">
				<a
					href={personalInfo.github}
					target="_blank"
					rel="noopener noreferrer"
					class="link text-text-secondary hover:text-accent flex items-center gap-1.5 group"
				>
					<svg class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
					</svg>
					GitHub
				</a>
				<a
					href={personalInfo.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					class="link text-text-secondary hover:text-accent flex items-center gap-1.5 group"
				>
					<svg class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
						<circle cx="4" cy="4" r="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
					</svg>
					LinkedIn
				</a>
				<a
					href="/AyaanKhan_Resume_March26.pdf"
					target="_blank"
					class="link text-text-secondary hover:text-accent flex items-center gap-1.5 group"
				>
					<svg class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
					</svg>
					Resume
				</a>
			</div>

			<NowCards watching={nowWatching} building={nowBuilding} using={nowUsing} />
		</div>
		<button class="scroll-hint" onclick={() => scrollToSection(1)} aria-label="Next section">
			<ChevronDown class="w-5 h-5" />
		</button>
	</section>

	<!-- ── 02 · About ── -->
	<section id="about" class="snap-section" class:is-visible={activeIdx === 1}>
		<div class="section-watermark">02</div>
		<div class="section-inner mx-auto w-full max-w-5xl px-6 md:px-12 py-16 md:py-0">
			<span class="section-label">Background</span>
			<h2 class="snap-heading mb-7">About Me</h2>

			<div class="grid md:grid-cols-2 gap-6 md:gap-8">
				<!-- Left: About text -->
				<div class="flex flex-col justify-center">
					<p class="text-base md:text-lg text-text-primary leading-relaxed">
						{personalInfo.aboutMe}
					</p>
				</div>

				<!-- Right: Education -->
				<div
					class="card-glow rounded-xl p-5 md:p-6 backdrop-blur-sm"
					style="background-color: rgb(var(--color-surface-channels) / 0.8);"
				>
					<div class="flex items-center gap-2 mb-4">
						<GraduationCap class="w-5 h-5 text-accent" />
						<h3 class="font-futura text-lg font-bold text-text-primary">Education</h3>
					</div>
					<h4 class="font-futura text-xl font-semibold text-text-primary">
						{personalInfo.education.degree}
					</h4>
					{#if personalInfo.education.minor}
						<p class="text-text-secondary font-medium mt-1">{personalInfo.education.minor}</p>
					{/if}
					<p class="text-accent font-medium mt-1">{personalInfo.education.university}</p>
					<p class="text-accent-glow font-mono text-sm mt-1">{personalInfo.education.year}</p>
					{#if personalInfo.education.relevantCoursework}
						<div class="mt-4 pt-4 border-t border-white/5">
							<div class="flex flex-wrap gap-1.5">
								{#each personalInfo.education.relevantCoursework as course}
									<span
										class="px-2 py-0.5 text-xs bg-surface/50 border border-white/10 rounded text-text-secondary hover:text-accent hover:border-accent/30 transition-colors cursor-default"
									>
										{course}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<button class="scroll-hint" onclick={() => scrollToSection(2)} aria-label="Next section">
			<ChevronDown class="w-5 h-5" />
		</button>
	</section>

	<!-- ── 03 · Experience ── -->
	<section id="experience" class="snap-section" class:is-visible={activeIdx === 2}>
		<div class="section-watermark">03</div>
		<div class="section-inner mx-auto w-full max-w-5xl px-6 md:px-12 py-16 md:py-0">
			<span class="section-label">Career</span>
			<h2 class="snap-heading mb-6">Experience</h2>

			<div class="space-y-5">
				{#each workExperience as exp, i}
					{#if i > 0}
						<div class="h-px bg-white/5"></div>
					{/if}
					<div class="grid md:grid-cols-[1fr_auto] gap-3">
						<div>
							<h3 class="font-futura text-lg md:text-xl font-semibold text-text-primary">
								{exp.position}
							</h3>
							<p class="text-accent font-medium text-sm md:text-base mt-0.5">
								{#if exp.link}
									<a
										href={exp.link}
										target="_blank"
										rel="noopener noreferrer"
										class="hover:text-accent-glow transition-colors"
									>{exp.company}</a>
								{:else}
									{exp.company}
								{/if}
							</p>
							<ul class="mt-2 space-y-1 list-disc list-outside ml-4 marker:text-accent/60">
								{#each exp.bullets as bullet}
									<li class="text-text-secondary text-sm leading-relaxed">{bullet}</li>
								{/each}
							</ul>
						</div>
						<div class="text-right text-xs font-mono text-text-muted shrink-0 pt-1">
							<p>{exp.location}</p>
							<p class="text-accent-glow mt-0.5">{exp.period}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<button class="scroll-hint" onclick={() => scrollToSection(3)} aria-label="Next section">
			<ChevronDown class="w-5 h-5" />
		</button>
	</section>

	<!-- ── 04 · Projects ── -->
	<section id="projects" class="snap-section" class:is-visible={activeIdx === 3}>
		<div class="section-watermark">04</div>
		<div class="section-inner mx-auto w-full max-w-5xl px-6 md:px-12 py-16 md:py-0">
			<span class="section-label">Work</span>
			<h2 class="snap-heading mb-5">Projects</h2>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
				{#each projects as project}
					<article
						class="card-glow rounded-lg p-4 backdrop-blur-sm group flex flex-col cursor-pointer"
						style="background-color: rgb(var(--color-surface-channels) / 0.8);"
						onclick={() => (selectedProject = project)}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && (selectedProject = project)}
						aria-label="View {project.name} details"
					>
						<div class="flex items-start justify-between mb-1.5">
							<h3
								class="font-futura text-sm md:text-base font-semibold text-text-primary group-hover:text-accent-glow transition-colors leading-tight"
							>
								{project.name}
							</h3>
							<div class="flex items-center gap-1.5 shrink-0 ml-1">
								{#if project.status}
									<span class="text-xs text-accent font-mono">·{project.status}</span>
								{/if}
								<span class="text-text-muted/40 group-hover:text-accent transition-colors text-xs">↗</span>
							</div>
						</div>
						<p class="text-text-secondary text-xs leading-relaxed mb-2 line-clamp-2 flex-1">
							{project.bullets[0]}
						</p>
						<p class="text-xs text-text-muted font-mono border-t border-border/40 pt-1.5 line-clamp-1">
							{project.tech}
						</p>
					</article>
				{/each}
			</div>
		</div>
		<button class="scroll-hint" onclick={() => scrollToSection(4)} aria-label="Next section">
			<ChevronDown class="w-5 h-5" />
		</button>
	</section>

	<!-- ── 05 · Systems Thinking ── -->
	<section id="systems-thinking" class="snap-section" class:is-visible={activeIdx === 4}>
		<div class="section-watermark">05</div>
		<div class="section-inner mx-auto w-full max-w-5xl px-6 md:px-12">
			<span class="section-label">Mental Model</span>
			<h2 class="snap-heading mb-8">Systems Thinking</h2>

			<ol class="space-y-4 max-w-2xl">
				{#each systemsThinking as item, i}
					<li class="flex gap-5 group">
						<span
							class="font-mono text-accent-glow font-bold min-w-[2.5rem] text-base group-hover:text-accent transition-colors"
						>
							{String(i + 1).padStart(2, '0')}.
						</span>
						<span class="text-text-secondary text-base leading-relaxed">{item}</span>
					</li>
				{/each}
			</ol>

			<footer class="mt-10 pt-6 border-t border-white/5 text-sm text-text-muted">
				<p>&copy; {new Date().getFullYear()} {personalInfo.name}</p>
				<p class="mt-1 font-mono">Built with <span class="text-accent">SvelteKit</span></p>
			</footer>
		</div>
	</section>
</div>

<!-- Project detail modal -->
<ProjectModal project={selectedProject} onclose={() => (selectedProject = null)} />

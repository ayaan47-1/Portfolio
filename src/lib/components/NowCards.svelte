<script lang="ts">
	import type { NowWatching, NowBuilding, NowUsing } from '$lib/types';
	import SpotifyCard from './SpotifyCard.svelte';
	import { Zap, Monitor, Clapperboard } from 'lucide-svelte';

	interface Props {
		watching: NowWatching;
		building: NowBuilding[];
		using: NowUsing;
	}

	const { watching, building, using }: Props = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

	<!-- Building -->
	<div class="now-card h-full text-text-primary rounded-xl p-4 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
		<div class="flex items-center gap-2 mb-3">
			<Zap class="w-3.5 h-3.5 text-accent group-hover:text-accent-glow transition-colors" />
			<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Building</span>
		</div>
		<div class="space-y-2">
			{#each building as item}
				<div>
					{#if item.link}
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-medium text-accent hover:text-accent-glow transition-colors underline decoration-transparent hover:decoration-accent underline-offset-2"
						>{item.name}</a>
					{:else}
						<span class="text-sm font-medium text-accent">{item.name}</span>
					{/if}
					<p class="text-xs text-text-muted mt-0.5">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Using -->
	<div class="now-card h-full text-text-primary rounded-xl p-4 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
		<div class="flex items-center gap-2 mb-3">
			<Monitor class="w-3.5 h-3.5 text-accent group-hover:text-accent-glow transition-colors" />
			<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Using</span>
		</div>

		<div class="mb-3">
			<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-1.5">Hardware</p>
			<div class="space-y-0.5">
				{#each using.hardware as item}
					<p class="text-xs text-text-secondary">{item}</p>
				{/each}
			</div>
		</div>

		<div>
			<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-1.5">Software</p>
			<div class="space-y-0.5">
				{#each using.software as item}
					<p class="text-xs text-text-secondary">{item}</p>
				{/each}
			</div>
		</div>
	</div>

	<!-- Stacked Watching & Spotify -->
	<div class="flex flex-col gap-3 h-full">
		<!-- Watching -->
		<div class="now-card flex-1 text-text-primary rounded-xl p-4 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
			<div class="flex items-center gap-2 mb-3">
				<Clapperboard class="w-3.5 h-3.5 text-accent group-hover:text-accent-glow transition-colors" />
				<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Watching</span>
			</div>

			<div class="mb-2.5">
				<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-1">Currently</p>
				<p class="text-sm font-medium text-text-primary leading-snug">{watching.title}</p>
				<p class="text-xs text-text-muted mt-0.5">{watching.type} · {watching.year}</p>
			</div>

			{#if watching.past && watching.past.length > 0}
				<div>
					<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-1">Past</p>
					<div class="flex flex-wrap gap-x-2 gap-y-0.5">
						{#each watching.past as show}
							<p class="text-xs text-text-muted">{show}</p>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Listening (Spotify) -->
		<div class="flex-none">
			<SpotifyCard />
		</div>
	</div>

</div>

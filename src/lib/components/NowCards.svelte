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

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

	<!-- Building -->
	<div class="now-card h-full text-text-primary rounded-xl p-6 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
		<div class="flex items-center gap-2 mb-4">
			<Zap class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" />
			<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Building</span>
		</div>
		<div class="space-y-3">
			{#each building as item}
				<div>
					{#if item.link}
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-base font-medium text-accent hover:text-accent-glow transition-colors underline decoration-transparent hover:decoration-accent underline-offset-2"
						>{item.name}</a>
					{:else}
						<span class="text-base font-medium text-accent">{item.name}</span>
					{/if}
					<p class="text-sm text-text-muted mt-0.5">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Using -->
	<div class="now-card h-full text-text-primary rounded-xl p-6 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
		<div class="flex items-center gap-2 mb-4">
			<Monitor class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" />
			<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Using</span>
		</div>
		
		<div class="mb-4">
			<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-2">Hardware</p>
			<div class="space-y-1">
				{#each using.hardware as item}
					<p class="text-sm text-text-secondary">{item}</p>
				{/each}
			</div>
		</div>
		
		<div>
			<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-2">Software</p>
			<div class="space-y-1">
				{#each using.software as item}
					<p class="text-sm text-text-secondary">{item}</p>
				{/each}
			</div>
		</div>
	</div>

	<!-- Stacked Watching & Spotify -->
	<div class="flex flex-col gap-4 h-full">
		<!-- Watching -->
		<div class="now-card flex-1 text-text-primary rounded-xl p-6 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-all duration-300 group" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
			<div class="flex items-center gap-2 mb-4">
				<Clapperboard class="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" />
				<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Watching</span>
			</div>
			
			<div class="mb-4">
				<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-2">Currently</p>
				<p class="text-base font-medium text-text-primary leading-snug">{watching.title}</p>
				<p class="text-sm text-text-muted mt-0.5">{watching.type} · {watching.year}</p>
			</div>

			{#if watching.past && watching.past.length > 0}
				<div>
					<p class="text-xs font-bold font-futura text-text-secondary uppercase tracking-wider mb-2">Past Watched</p>
					<div class="space-y-1">
						{#each watching.past as show}
							<p class="text-sm text-text-muted">{show}</p>
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

<script lang="ts">
	import { onMount } from 'svelte';

	interface SpotifyTrack {
		name: string;
		artist: string;
		albumArt: string | null;
		url: string;
		playedAt: string;
	}

	let track = $state<SpotifyTrack | null>(null);
	let loading = $state(true);
	let error = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('/api/spotify');
			if (res.ok) {
				track = await res.json();
			} else {
				error = true;
			}
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});

	function timeAgo(dateStr: string): string {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 60) return `${mins}m ago`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs}h ago`;
		return `${Math.floor(hrs / 24)}d ago`;
	}
</script>

<div class="spotify-card card-glow rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm" style="background-color: rgb(var(--color-surface-channels) / 0.6);">
	<!-- Header -->
	<div class="flex items-center gap-2">
		<!-- Spotify logo SVG -->
		<svg class="w-4 h-4 text-[#1DB954] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
			/>
		</svg>
		<span class="text-xs font-futura text-text-muted uppercase tracking-widest">Recently played</span>
	</div>

	<!-- Content -->
	{#if loading}
		<!-- Skeleton -->
		<div class="flex gap-3 items-center animate-pulse">
			<div class="w-14 h-14 rounded bg-border/40 flex-shrink-0"></div>
			<div class="flex flex-col gap-2 flex-1">
				<div class="h-3 bg-border/40 rounded w-3/4"></div>
				<div class="h-3 bg-border/40 rounded w-1/2"></div>
			</div>
		</div>
	{:else if track}
		<a
			href={track.url}
			target="_blank"
			rel="noopener noreferrer"
			class="flex gap-3 items-center group"
		>
			{#if track.albumArt}
				<img
					src={track.albumArt}
					alt="{track.name} album art"
					class="w-14 h-14 rounded object-cover flex-shrink-0 shadow-lg group-hover:shadow-[0_0_12px_rgba(29,185,84,0.4)] transition-shadow duration-300"
				/>
			{:else}
				<div class="w-14 h-14 rounded bg-border/40 flex-shrink-0 flex items-center justify-center">
					<svg class="w-6 h-6 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
					</svg>
				</div>
			{/if}

			<div class="flex flex-col min-w-0">
				<span class="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors duration-200">
					{track.name}
				</span>
				<span class="text-xs text-text-secondary truncate">{track.artist}</span>
				<span class="text-xs text-text-muted mt-1 font-mono">{timeAgo(track.playedAt)}</span>
			</div>
		</a>
	{:else}
		<div class="flex gap-3 items-center">
			<div class="w-14 h-14 rounded bg-border/40 flex-shrink-0 flex items-center justify-center">
				<svg class="w-6 h-6 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
				</svg>
			</div>
			<span class="text-sm text-text-muted italic">Nothing playing recently</span>
		</div>
	{/if}
</div>

<style>
	.spotify-card {
		border-color: rgb(var(--color-accent-channels) / 0.2);
	}
	.spotify-card:hover {
		border-color: rgb(var(--color-accent-channels) / 0.5);
		box-shadow: 0 0 20px rgb(var(--color-accent-channels) / 0.15), 0 0 40px rgb(var(--color-accent-channels) / 0.05);
	}
</style>

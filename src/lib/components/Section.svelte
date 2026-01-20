<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		id?: string;
		children: Snippet;
	}

	const { title, id, children }: Props = $props();
</script>

<section {id} aria-labelledby={id ? `${id}-heading` : undefined} class="py-16 md:py-24">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<h2 id={id ? `${id}-heading` : undefined} class="mb-12 font-mono text-3xl md:text-4xl font-bold text-text-primary">
			{title}
		</h2>
		{@render children()}
	</div>
</section>

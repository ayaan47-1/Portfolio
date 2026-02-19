<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		id?: string;
		children: Snippet;
	}

	const { title, id, children }: Props = $props();
</script>

<section {id} aria-labelledby={id ? `${id}-heading` : undefined} class="py-8 md:py-12 fade-in">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<h2 
			id={id ? `${id}-heading` : undefined} 
			class="mb-8 font-futura text-4xl md:text-5xl font-bold text-text-primary inline-block underline-with-gaps"
		>
			{title}
		</h2>
		{@render children()}
	</div>
</section>

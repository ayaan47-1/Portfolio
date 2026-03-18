<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { MessageCircle, X, Send, Bot } from 'lucide-svelte';

	let open = $state(false);
	let input = $state('');
	let loading = $state(false);
	let messagesEl = $state<HTMLElement | null>(null);

	type Message = { role: 'user' | 'assistant'; content: string };
	let messages = $state<Message[]>([
		{
			role: 'assistant',
			content: "Hey — I'm Ayaan. Ask me anything about my work, projects, or background."
		}
	]);

	async function send() {
		const text = input.trim();
		if (!text || loading) return;
		input = '';
		messages = [...messages, { role: 'user', content: text }];
		loading = true;

		// Append empty assistant message to stream into
		messages = [...messages, { role: 'assistant', content: '' }];
		const assistantIdx = messages.length - 1;

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages
						.slice(0, -1) // exclude the empty assistant placeholder
						.map((m) => ({ role: m.role, content: m.content }))
				})
			});

			if (!res.ok) throw new Error('Request failed');

			const reader = res.body!.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value);
				messages = messages.map((m, i) =>
					i === assistantIdx ? { ...m, content: m.content + chunk } : m
				);
				await tick();
				scrollBottom();
			}
		} catch {
			messages = messages.map((m, i) =>
				i === assistantIdx
					? { ...m, content: 'Something went wrong. Try again.' }
					: m
			);
		} finally {
			loading = false;
			await tick();
			scrollBottom();
		}
	}

	function scrollBottom() {
		if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}

	const SUGGESTIONS = ['What are you building right now?', 'What\'s your tech stack?', 'Are you open to work?'];
</script>

<!-- Toggle button -->
<button
	onclick={() => (open = !open)}
	aria-label="Chat with Ayaan"
	class="fixed bottom-24 md:bottom-8 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center
	       bg-accent text-white shadow-[0_0_20px_var(--color-accent)/50] hover:shadow-[0_0_28px_var(--color-accent)/70]
	       transition-all duration-300 {open ? 'scale-90' : 'scale-100 hover:scale-105'}"
>
	{#if open}
		<X class="w-5 h-5" />
	{:else}
		<MessageCircle class="w-5 h-5" />
	{/if}
</button>

<!-- Chat panel -->
{#if open}
	<div
		class="fixed bottom-40 md:bottom-24 left-6 z-50 w-80 md:w-96 rounded-2xl border border-border
		       shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
		style="background-color: rgb(var(--color-surface-channels) / 0.97); backdrop-filter: blur(16px); max-height: 480px;"
	>
		<!-- Header -->
		<div class="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
			<div class="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
				<Bot class="w-4 h-4 text-accent" />
			</div>
			<div>
				<p class="text-sm font-semibold text-text-primary font-futura">Ayaan Khan</p>
				<p class="text-xs text-accent flex items-center gap-1">
					<span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span>
					AI-powered · ask me anything
				</p>
			</div>
		</div>

		<!-- Messages -->
		<div
			bind:this={messagesEl}
			class="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin"
			style="min-height: 0;"
		>
			{#each messages as msg}
				<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed {msg.role === 'user'
							? 'bg-accent text-white rounded-br-sm'
							: 'bg-white/5 text-text-primary border border-white/8 rounded-bl-sm'}"
					>
						{#if msg.content === '' && loading}
							<span class="flex gap-1 items-center h-4">
								<span class="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style="animation-delay:0ms"></span>
								<span class="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style="animation-delay:150ms"></span>
								<span class="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style="animation-delay:300ms"></span>
							</span>
						{:else}
							{msg.content}
						{/if}
					</div>
				</div>
			{/each}

			<!-- Suggestions (only shown initially) -->
			{#if messages.length === 1}
				<div class="flex flex-col gap-1.5 mt-2">
					{#each SUGGESTIONS as s}
						<button
							onclick={() => { input = s; send(); }}
							class="text-left text-xs text-text-muted border border-border rounded-lg px-3 py-1.5 hover:border-accent/50 hover:text-accent transition-all"
						>
							{s}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Input -->
		<div class="px-3 py-3 border-t border-border shrink-0 flex gap-2">
			<input
				type="text"
				bind:value={input}
				onkeydown={handleKey}
				placeholder="Ask something..."
				disabled={loading}
				class="flex-1 bg-white/5 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted
				       focus:outline-none focus:border-accent/60 transition-colors disabled:opacity-50"
			/>
			<button
				onclick={send}
				disabled={loading || !input.trim()}
				class="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white
				       hover:bg-accent-hover transition-colors disabled:opacity-40 shrink-0"
			>
				<Send class="w-4 h-4" />
			</button>
		</div>
	</div>
{/if}

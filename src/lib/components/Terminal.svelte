<script lang="ts">
	import { onMount } from 'svelte';

	let open = $state(false);
	let input = $state('');
	let lines = $state<{ type: 'cmd' | 'out' | 'err'; text: string }[]>([]);
	let inputEl = $state<HTMLInputElement | null>(null);
	let outputEl = $state<HTMLElement | null>(null);
	let history = $state<string[]>([]);
	let historyIdx = $state(-1);

	const HELP_TEXT = `available commands:
  whoami          — who is this guy
  ls projects     — list all projects
  ls              — same thing
  cat resume.txt  — résumé summary
  skills          — tech stack
  contact         — get in touch
  clear           — clear terminal
  exit / q        — close terminal`;

	const COMMANDS: Record<string, string> = {
		whoami: `Ayaan Khan
Applied AI & ML Engineer · Chicago, IL
B.S. Artificial Intelligence @ Illinois Tech (May 2026)
Currently: AI intern @ The Syntec Group`,

		ls: `projects/
├── clutch          [staging]  — AI course generation SaaS
├── syntec-agent    [deployed] — agentic BIM code system
├── syntec-chatbot  [deployed] — RAG chatbot over docs
├── investochat                — real estate RAG + WhatsApp
├── trend-analyzer             — cotton price forecasting
└── sports-tracker             — soccer video analysis (YOLOv8)`,

		'ls projects': `projects/
├── clutch          [staging]  — AI course generation SaaS
├── syntec-agent    [deployed] — agentic BIM code system
├── syntec-chatbot  [deployed] — RAG chatbot over docs
├── investochat                — real estate RAG + WhatsApp
├── trend-analyzer             — cotton price forecasting
└── sports-tracker             — soccer video analysis (YOLOv8)`,

		'cat resume.txt': `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AYAAN KHAN — RÉSUMÉ SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Education:  B.S. AI, Illinois Tech (May 2026)
            Minor: Architecture

Experience: AI & Digital Dev Intern, The Syntec Group (2025–)
            Co-Founder, Volunteers.Covihelp (2021)
            Project Manager, Excelerate (2023)

Core skills: RAG · LLM systems · FastAPI · PostgreSQL/pgvector
             Redis · Docker · SvelteKit · OpenAI · Claude

Full PDF: /AyaanKhan_Resume_March26.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

		skills: `languages:   Python · TypeScript · SQL · Assembly
frameworks:  FastAPI · Flask · SvelteKit · React
AI/ML:       OpenAI · Claude · LiteLLM · PydanticAI
             ChromaDB · pgvector · RAG pipelines
infra:       PostgreSQL · Redis · Docker · Nginx
             Sentry · PostHog · SSE streaming`,

		contact: `email:    ayaanahmedkhan12@gmail.com
github:   github.com/ayaan47-1
linkedin: linkedin.com/in/ayaanahmedkhan
resume:   /AyaanKhan_Resume_March26.pdf`,

		help: HELP_TEXT,
		'?': HELP_TEXT
	};

	function run(cmd: string) {
		const trimmed = cmd.trim().toLowerCase();
		if (!trimmed) return;

		history = [trimmed, ...history.slice(0, 49)];
		historyIdx = -1;
		lines = [...lines, { type: 'cmd', text: cmd }];

		if (trimmed === 'clear') {
			lines = [];
			return;
		}
		if (trimmed === 'exit' || trimmed === 'q') {
			open = false;
			return;
		}

		const out = COMMANDS[trimmed];
		if (out) {
			lines = [...lines, { type: 'out', text: out }];
		} else {
			lines = [
				...lines,
				{ type: 'err', text: `command not found: ${cmd}\ntype 'help' for available commands` }
			];
		}

		setTimeout(() => {
			if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
		}, 10);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			run(input);
			input = '';
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			historyIdx = Math.min(historyIdx + 1, history.length - 1);
			input = history[historyIdx] ?? '';
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			historyIdx = Math.max(historyIdx - 1, -1);
			input = historyIdx === -1 ? '' : history[historyIdx];
		}
	}

	onMount(() => {
		function onKeydown(e: KeyboardEvent) {
			if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
				const tag = (e.target as HTMLElement).tagName;
				if (tag === 'INPUT' || tag === 'TEXTAREA') return;
				e.preventDefault();
				open = !open;
				if (open) {
					lines = [{ type: 'out', text: `ayaan-khan terminal v1.0\ntype 'help' to see commands\n` }];
					setTimeout(() => inputEl?.focus(), 50);
				}
			}
			if (e.key === 'Escape' && open) {
				open = false;
			}
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});

	function focusInput() {
		inputEl?.focus();
	}
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
		onclick={(e) => { if (e.target === e.currentTarget) open = false; }}
		role="dialog"
		aria-modal="true"
		aria-label="Terminal"
	>
		<!-- Terminal window -->
		<div
			class="w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
			style="background: #0d0d0d; height: min(520px, 80vh);"
			onclick={focusInput}
			role="presentation"
		>
			<!-- Title bar -->
			<div class="flex items-center gap-2 px-4 py-3 border-b border-white/5 shrink-0" style="background:#111;">
				<span class="w-3 h-3 rounded-full bg-red-500/80"></span>
				<span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
				<span class="w-3 h-3 rounded-full bg-green-500/80"></span>
				<span class="ml-3 text-xs font-mono text-white/30">ayaan@portfolio ~ press ` to close</span>
			</div>

			<!-- Output -->
			<div
				bind:this={outputEl}
				class="flex-1 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed space-y-2"
				style="scrollbar-width: thin; scrollbar-color: #333 transparent;"
			>
				{#each lines as line}
					{#if line.type === 'cmd'}
						<p class="text-green-400">
							<span class="text-blue-400">ayaan</span><span class="text-white/40">@portfolio</span>
							<span class="text-white/30">:</span><span class="text-accent">~</span>
							<span class="text-white/30"> $ </span>{line.text}
						</p>
					{:else if line.type === 'err'}
						<pre class="text-red-400/80 whitespace-pre-wrap">{line.text}</pre>
					{:else}
						<pre class="text-white/75 whitespace-pre-wrap">{line.text}</pre>
					{/if}
				{/each}
			</div>

			<!-- Input line -->
			<div class="flex items-center gap-2 px-5 py-3 border-t border-white/5 shrink-0 font-mono text-sm">
				<span class="text-blue-400 shrink-0">ayaan</span>
				<span class="text-white/30">@portfolio</span>
				<span class="text-white/30">:</span>
				<span class="text-accent">~</span>
				<span class="text-white/30"> $</span>
				<input
					bind:this={inputEl}
					bind:value={input}
					onkeydown={handleKey}
					class="flex-1 bg-transparent outline-none text-white caret-accent"
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
				/>
			</div>
		</div>
	</div>
{/if}

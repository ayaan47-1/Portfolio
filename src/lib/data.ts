import type {
	PersonalInfo,
	Project,
	WorkExperience,
	NowWatching,
	NowBuilding,
	NowUsing,
	SystemsThinkingItem,
	CommSample
} from './types';

export const personalInfo: PersonalInfo = {
	name: 'Ayaan Khan',
	title: 'Applied AI & ML',
	location: 'Chicago, IL',
	email: 'ayaanahmedkhan12@gmail.com',
	valueLine:
		'AI engineer and backend developer building production LLM systems, including retrieval augmented generation, semantic search, and multi-stage agent workflows.',
	github: 'https://github.com/ayaan47-1',
	linkedin: 'https://www.linkedin.com/in/ayaanahmedkhan/',
	aboutMe:
		"AI engineer building production LLM systems — RAG pipelines, semantic search, multi-agent workflows. Originally from New Delhi, based in Chicago. Outside the terminal, I'm an avid football fan (the real kind), play guitar, and spend too much time thinking about music and art. I think good taste is a technical skill.",
	goals:
		'After graduation in May 2026, I want to join a team where I can ship AI systems that actually matter — whether that is at a fast-moving startup or a company building infrastructure for the next wave of intelligent software. Longer term, I want to build products of my own at the intersection of AI and systems design, and eventually contribute to research that makes LLM pipelines more reliable and interpretable.',
	commApproach:
		"Technical work only matters if others can act on it. My approach: meet the audience where they are — precise specs for engineers, concrete outcomes for stakeholders. A confusing interface is a communication failure. In AI especially, closing the gap between what a model does and what people think it does is one of the highest-value skills on a team.",
	motivation: '',
	education: {
		university: 'Illinois Institute of Technology',
		degree: 'B.S. in Artificial Intelligence',
		minor: 'Minor in Architecture',
		year: 'Expected May 2026',
		relevantCoursework: [
			'DSA',
			'AI',
			'ML',
			'NLP',
			'DBMS',
			'Assembly',
			'Data Mining',
			'Discrete Math',
			'Linear Algebra',
			'Probability',
			'Statistics',
			'OOP'
		]
	}
};

export const projects: Project[] = [
	{
		name: 'Clutch',
		link: 'https://staging.clutch.courses/',
		glowColor: '#00ff00',
		status: 'staging',
		bullets: [
			'Built a staging-deployed SaaS that generates research-backed courses using a multi-stage agent pipeline, orchestrating 5 stages with persisted job state, retry policies, and failure isolation to keep long-running workflows reliable.',
			'Implemented an asynchronous FastAPI backend with PostgreSQL plus pgvector and Redis caching, and streamed real-time job progress to clients using SSE backed by Redis to keep generation workflows responsive.',
			'Cut inference cost and improved output quality using LiteLLM routing and shared source deduplication; enforced structured outputs with PydanticAI validation and added observability via Sentry and PostHog.'
		],
		tech: 'FastAPI, Postgres/pgvector, Redis, Inngest, SvelteKit, LiteLLM, PydanticAI, Docker, Sentry, PostHog'
	},
	{
		name: 'SyntecAgent',
		link: 'https://syntec-agent.vercel.app/',
		glowColor: '#3b82f6',
		status: 'deployed',
		bullets: [
			'Built an agentic Coding, Classification & Naming system using OpenAI function calling that enables users to query, add, update, and delete BIM module codes through natural language with automated sub-code assignment.',
			'Ingested XLSX classification sheets into SQLite with category-derived indexing, synced agent-written entries atomically to ChromaDB for semantic retrieval, and exposed a REST API with confirmation gates on destructive operations.',
			'Designed a dependency-injected agent package architecture that eliminates circular imports, enforces SQLite-to-ChromaDB transactional consistency with rollback on sync failure, and caps query results to prevent unbounded responses.'
		],
		tech: 'Flask, OpenAI Function Calling, SQLite, ChromaDB, React, Docker'
	},
	{
		name: 'VeritasLayer',
		link: 'https://veritaslayer.net/',
		glowColor: '#f59e0b',
		status: 'deployed',
		bullets: [
			'Built an evidence-traceable document intelligence platform that extracts obligations, risk signals, and structured summaries from operational documents using LLM pipelines with source-level citation.',
			'Designed a multi-stage ingestion pipeline supporting PDF and structured document formats, with chunking, embedding, and vector indexing for high-recall semantic retrieval.',
			'Surfaced risk alerts and obligation tracking with traceable provenance — linking every extracted claim back to its source passage for auditability.'
		],
		tech: 'FastAPI, LLMs, Vector Search, PDF Ingestion, SvelteKit'
	},
	{
		name: 'Syntec AI Chatbot',
		link: 'https://build.syntecgroup.com/',
		glowColor: '#3b82f6',
		status: 'deployed',
		bullets: [
			'Shipped a semantic search and retrieval-augmented chatbot using GPT-4o and ChromaDB embeddings to deliver question answering across PDF documents, CSVs, blog posts, and website content with automated source citations.',
			'Processed and chunked multi-format documents including PDF, CSV, XLSX, and PNG with OCR, cached embeddings by content hash with Redis, and served top-10 similarity results with a dual-LLM fallback strategy using DeepSeek for cost optimization.',
			'Containerized the full stack with Docker Compose in dual deployment modes, and deployed the frontend to Vercel with HTTPS and server-side rewrites proxying API traffic to the DigitalOcean backend.'
		],
		tech: 'Flask, React, Vite, ChromaDB, OpenAI GPT-4o, DeepSeek, Redis, Docker, Nginx, Vercel'
	},
	{
		name: 'InvestoChat',
		bullets: [
			'RAG system for real estate investment queries with multi-path retrieval (pgvector + SQL fallbacks with MMR), OCR processing, and automated table extraction from PDF brochures.',
			'WhatsApp Business API lead qualification + Airtable CRM sync + commission tracking + rate limiting + PII detection.'
		],
		tech: 'FastAPI, Postgres/pgvector, OCR, WhatsApp Business API, Airtable'
	},
	{
		name: 'Trend Analyzer for Raw Materials',
		bullets: [
			'Cotton price forecasting using Facebook Prophet with external regressors (oil, gas, soybeans); evaluated with MAPE.',
			'Multivariate regression analysis of correlated commodity markets; time-series cross validation.'
		],
		tech: 'Python, Prophet, Pandas, Matplotlib'
	},
	{
		name: 'Sports and Metrics Tracker',
		bullets: [
			'Built an end-to-end soccer video analysis pipeline using YOLOv8 detection and ByteTrack tracking, adding temporal smoothing for stable motion analytics and CPU only local processing with robust cross-platform video input and output.',
			'Developed export and visualization tooling, including CSV and JSON metrics with track filtering (minimum 15 frames), heatmap rendering with percentile transforms, and tiered error handling with debug mode progress reporting.'
		],
		tech: 'Python, YOLOv8, ByteTrack, OpenCV'
	}
];

export const systemsThinking: SystemsThinkingItem[] = [
	{
		title: 'Ingestion & preprocessing',
		subtitle: 'Clean, chunk, and index messy docs so retrieval starts from ground truth'
	},
	{
		title: 'Hybrid retrieval + reranking',
		subtitle: 'Vector search alone hallucinates on structured data — combine with lexical matching and rerank'
	},
	{
		title: 'Agentic workflows & guardrails',
		subtitle: 'Function-calling agents with confirmation gates before anything destructive touches production'
	},
	{
		title: 'Structured outputs & validation',
		subtitle: "Every LLM response parsed through Pydantic schemas — if it doesn't conform, it doesn't ship"
	},
	{
		title: 'Latency/cost routing',
		subtitle: 'LiteLLM across models, Redis caching, and fallback LLMs — not every query needs GPT-4o'
	},
	{
		title: 'Observability & failure modes',
		subtitle: 'Inngest job tracing, eval harnesses — catch breaks before users do'
	}
];

export const workExperience: WorkExperience[] = [
	{
		company: 'The Syntec Group',
		position: 'AI & Digital Development Intern',
		location: 'Chicago, Illinois',
		period: 'May 2025 – Present',
		bullets: [
			'Built and deployed a semantic RAG chatbot on Chatbase over firm documents, delivering cited, context-grounded answers to reduce lookup time and improve response consistency.',
			'Developed an internal agentic system using OpenAI function calling to manage building module codes through natural language, with confirmation flows for destructive operations and ChromaDB sync for semantic search.',
			'Implemented ingestion and retrieval workflow (chunking, embeddings, indexing) across PDFs, CSVs, website pages, and WordPress blog posts, with embedding caching via Redis that reduced inference cost by approximately 65%.',
			'Led an information architecture plus website redesign improving navigation and access to resources; used engagement analysis to iterate content performance.'
		]
	},
	{
		company: 'Volunteers.Covihelp',
		position: 'Co-Founder',
		location: 'Remote (India)',
		period: 'May 2021 – July 2021',
		link: 'https://volunteerscovihelp.org/',
		bullets: [
			"Created and managed a 24/7 helpline during India's second COVID wave, connecting thousands of patients with critical resources like oxygen, beds, and medicines."
		]
	},
	{
		company: 'Excelerate (Globalshala)',
		position: 'Project Manager',
		location: 'New Delhi, India',
		period: 'June 2023 – July 2023',
		bullets: [
			'Led a global team to organize an academic event with a $30,000 budget, managing documentation, risk assessment, and external outsourcing.'
		]
	}
];

export const nowWatching: NowWatching = {
	title: 'House of Cards',
	year: '2025',
	type: 'Show',
	past: ['Industry', 'Silicon Valley', 'Severance', 'Succession']
};

export const nowBuilding: NowBuilding[] = [
	{
		name: 'VeritasLayer (deployed)',
		description:
			'Evidence-traceable obligations, risk alerts & summaries from operational documents',
		link: 'https://veritaslayer.net/'
	},
	{
		name: 'Clutch (staging)',
		description: 'AI course generation platform',
		link: 'https://staging.clutch.courses/'
	},
	{
		name: 'SyntecAgent (deployed)',
		description: 'Coding, Classification & Naming (CRUD) Agent'
	},
	{
		name: 'This site',
		description: 'continuously refining'
	}
];

export const nowUsing: NowUsing = {
	hardware: ['MacBook Pro M4 Pro', 'iPhone 17 Pro', 'Samsung Z Fold 7'],
	software: ['VS Code', 'Claude', 'Codex', 'Gemini', 'Ghostty']
};

export const nowLearning = {
	topic: 'Agentic workflows',
	context: 'in construction and real estate.'
};

export const commSamples: CommSample[] = [
	{
		title: 'IPRO Innovation Day — Research Poster',
		type: 'Academic Poster',
		audience: 'Faculty, industry judges & peers',
		description:
			"Sole designer of this poster for Illinois Tech's IPRO Innovation Day. The format demands compression — every word earns its place — and the mixed audience of faculty and industry judges forced me to layer technical depth with accessible framing. Fielding live questions sharpened my ability to adapt on the fly."
	},
	{
		title: 'Volunteers.Covihelp — Crisis Communication Campaign',
		type: 'Public Awareness & Operations',
		audience: 'General public, patients & families across India',
		description:
			"Co-founded a volunteer helpline during India's second COVID wave, writing outreach and coordination copy under real pressure. High-stakes, time-sensitive, directed at people in distress — clarity and empathy couldn't be traded off. Taught me that good communication removes friction for the reader, not credit for the writer."
	},
	{
		title: 'SyntecAgent — Technical Documentation & Stakeholder Handoff',
		type: 'Technical Write-up',
		audience: 'Engineering team & non-technical stakeholders at The Syntec Group',
		description:
			"Delivered SyntecAgent with docs written for two audiences simultaneously: developers maintaining the code and managers approving its use. Modularizing the document into clearly separated layers — rather than blending jargon with prose — made both versions sharper. Good technical writing is information architecture."
	},
	{
		title: 'Clutch — Pitch Deck & Product Narrative',
		type: 'Slide Deck',
		audience: 'Potential users, collaborators & early investors',
		description:
			"Pitching Clutch meant arguing why the product should exist to people with no reason to care yet. I led with the problem, not the tech — a deliberate choice that respects the audience's skepticism. Compressing a multi-stage AI pipeline into one compelling page made me a sharper communicator across every medium."
	}
];

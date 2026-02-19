import type { PersonalInfo, Project, WorkExperience, NowWatching, NowBuilding, NowUsing } from './types';

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
		'AI engineer and backend developer building production LLM systems, including retrieval augmented generation, semantic search, and multi-stage agent workflows. Experienced with asynchronous APIs, vector databases, Redis caching, job orchestration with retries, real-time streaming, and observability.',
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
		name: 'Syntec AI Chatbot',
		link: 'https://build.syntecgroup.com/',
		status: 'deployed',
		bullets: [
			'Shipped a semantic search and retrieval augmented chatbot using GPT-4o and ChromaDB embeddings to deliver question answering across PDF documents, CSVs, blog posts, and website content with automated source citations.',
			'Built an agentic system using OpenAI function calling that enables authorized users to read, write, and modify mastercode, unicode, and omnicode entries through natural language, with role-based access controls and confirmation flows for destructive operations.',
			'Containerized the service with Docker Compose for consistent deployments, implemented a dual-LLM fallback strategy for cost optimization, and added security controls including input sanitization, rate limiting, and CORS restrictions.'
		],
		tech: 'React, Flask, ChromaDB, Redis, Docker, WordPress'
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

export const systemsThinking: string[] = [
	'Data ingestion and cleaning',
	'Retrieval strategy (vector + lexical + rerank)',
	'Structured outputs + validation',
	'Latency/cost tradeoffs + caching',
	'Observability + failure modes'
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
			'Created and managed a 24/7 helpline during India’s second COVID wave, connecting thousands of patients with critical resources like oxygen, beds, and medicines.'
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
	title: 'Industry',
	year: '2024',
	type: 'Show',
	past: ['Silicon Valley', 'Severance', 'Succession']
};

export const nowBuilding: NowBuilding[] = [
	{
		name: 'Clutch (staging)',
		description: 'AI course generation platform',
		link: 'https://staging.clutch.courses/'
	},
	{
		name: 'SyntecAI (deployed)',
		description: 'Enterprise RAG platform',
		link: 'https://build.syntecgroup.com/'
	},
	{
		name: 'Internal Agent',
		description: 'Automating firm workflows'
	},
	{
		name: 'This site',
		description: 'continuously refining'
	}
];

export const nowUsing: NowUsing = {
	hardware: ['MacBook Pro M4 Pro', 'iPhone 17 Pro', 'Samsung Z Fold 7'],
	software: ['VS Code', 'Claude Code', 'Codex', 'Gemini', 'Ghostty', 'GarageBand']
};

import type { PersonalInfo, Project, WorkExperience } from './types';

export const personalInfo: PersonalInfo = {
	name: 'Ayaan Khan',
	title: 'AI Engineer / Applied ML',
	location: 'Chicago, IL',
	email: 'ayaanahmedkhan12@gmail.com',
	valueLine:
		'I build production-grade AI systems: retrieval, agents, pipelines, and real-time inference.',
	github: 'https://github.com/ayaan47-1',
	linkedin: 'https://www.linkedin.com/in/ayaanahmedkhan/'
};

export const projects: Project[] = [
	{
		name: 'Clutch',
		status: 'staging',
		bullets: [
			'Turns vague learning goals into structured, research-backed courses via a multi-stage AI pipeline; orchestrates 5 agents using Inngest with retries.',
			'Async FastAPI backend + Postgres (pgvector) + Redis; real-time progress streaming via WebSocket/Redis + SSE; cost optimization via LiteLLM routing and source deduplication.'
		],
		tech: 'FastAPI, Postgres/pgvector, Redis, Inngest, SvelteKit, LiteLLM, PydanticAI, Docker, Sentry, PostHog'
	},
	{
		name: 'Syntec AI Chatbot',
		bullets: [
			'Semantic search chatbot across PDFs/blog/site with automated citations and context-aware responses.',
			'React UI + Flask API + WordPress integration + scraping + Redis caching + Docker deployment; built for internal and client use.'
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
			'Working under the President of the firm, managing social media outlets by creating and publishing professional content posted weekly.',
			'Built an RAG chatbot ingesting numerous internal docs, delivering cited, context grounded answers.',
			'Leading a website redesign, improving navigation, categorization, and overall user experience to streamline access to firm resources alongside analyzing engagement metrics to optimize post performance and leveraging AI powered tools for content creation and trend analysis.',
			'Improved overall LinkedIn impressions by 122% and bimonthly by 25% towards 400+ new followers.'
		]
	},
	{
		company: 'Excelerate (Globalshala)',
		position: 'Project Manager',
		location: 'New Delhi, India',
		period: 'June 2023 – July 2023',
		bullets: [
			'Organized a live global event focusing on team creation, documentation, tasked thinking in a collaborative environment surrounding academia for the organization, considering risk management, and outsourcing to our audience with an approved budget of $30,000.'
		]
	}
];

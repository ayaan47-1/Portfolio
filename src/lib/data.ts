import type { PersonalInfo, Project } from './types';

export const personalInfo: PersonalInfo = {
	name: 'Ayaan Ahmed Khan',
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
	}
];

export const systemsThinking: string[] = [
	'Data ingestion and cleaning',
	'Retrieval strategy (vector + lexical + rerank)',
	'Structured outputs + validation',
	'Latency/cost tradeoffs + caching',
	'Observability + failure modes'
];

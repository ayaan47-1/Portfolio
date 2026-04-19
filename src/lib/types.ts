export interface PersonalInfo {
	name: string;
	title: string;
	location: string;
	email: string;
	valueLine: string;
	github: string;
	linkedin: string;
	aboutMe: string;
	goals?: string;
	commApproach?: string;
	motivation?: string;
	education?: {
		university: string;
		degree: string;
		minor?: string;
		year: string;
		relevantCoursework?: string[];
	};
}

export interface Project {
	name: string;
	link?: string;
	glowColor?: string;
	status?: string;
	bullets: string[];
	tech: string;
}

export interface WorkExperience {
	company: string;
	position: string;
	location: string;
	period: string;
	bullets: string[];
	link?: string;
}

export interface NowWatching {
	title: string;
	year: string;
	type: string; // 'Movie' | 'Show'
	past: string[];
}

export interface NowBuilding {
	name: string;
	description: string;
	link?: string;
}

export interface NowLearning {
	topic: string;
	context: string;
}

export interface NowUsing {
	hardware: string[];
	software: string[];
}

export interface SystemsThinkingItem {
	title: string;
	subtitle: string;
}

export interface CommSample {
	title: string;
	type: string; // e.g. 'Poster', 'Slide Deck', 'Research Paper', 'Volunteer Campaign'
	audience: string;
	description: string; // 2-3 sentences
	link?: string;
}

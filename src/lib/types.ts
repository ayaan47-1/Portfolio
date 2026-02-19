export interface PersonalInfo {
	name: string;
	title: string;
	location: string;
	email: string;
	valueLine: string;
	github: string;
	linkedin: string;
	aboutMe: string;
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
	bullets: [string, string];
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

export interface NowUsing {
	hardware: string[];
	software: string[];
}

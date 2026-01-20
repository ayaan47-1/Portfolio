export interface PersonalInfo {
	name: string;
	title: string;
	location: string;
	email: string;
	valueLine: string;
	github: string;
	linkedin: string;
}

export interface Project {
	name: string;
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
}

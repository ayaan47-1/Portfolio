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

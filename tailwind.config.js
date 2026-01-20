/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#0a0a0a',
				surface: '#111111',
				border: '#222222',
				'text-primary': '#e5e5e5',
				'text-secondary': '#a3a3a3',
				'text-muted': '#737373',
				accent: '#3b82f6'
			},
			fontFamily: {
				mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				surface: 'rgb(var(--color-surface-channels) / <alpha-value>)',
				border: 'rgb(var(--color-border-channels) / <alpha-value>)',
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-muted': 'var(--color-text-muted)',
				accent: 'rgb(var(--color-accent-channels) / <alpha-value>)',
				'accent-hover': 'var(--color-accent-hover)',
				'accent-glow': 'var(--color-accent-glow)',
				'accent-muted': 'var(--color-accent-muted)'
			},
			fontFamily: {
				futura: ['Futura', 'Futura PT', 'Trebuchet MS', 'Arial', 'sans-serif'],
				mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'slide-up': 'slideUp 0.5s ease-out forwards',
				glow: 'glow 2s ease-in-out infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				glow: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
					'50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }
				}
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(16, 185, 129, 0.3)',
				'glow-md': '0 0 20px rgba(16, 185, 129, 0.4)',
				'glow-lg': '0 0 30px rgba(16, 185, 129, 0.5)'
			}
		}
	},
	plugins: []
};

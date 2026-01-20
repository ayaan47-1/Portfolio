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
				accent: '#22c55e', // Brighter, more vibrant green
				'accent-hover': '#16a34a', // Rich green
				'accent-glow': '#4ade80', // Vivid light green
				'accent-muted': '#15803d' // Deeper green
			},
			fontFamily: {
				futura: ['Futura', 'Futura PT', 'Trebuchet MS', 'Arial', 'sans-serif'],
				mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'slide-up': 'slideUp 0.5s ease-out forwards',
				'glow': 'glow 2s ease-in-out infinite'
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

<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;

		const W = canvas.clientWidth;
		const H = canvas.clientHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);

		const cx = W / 2;
		const cy = H / 2;
		const s = Math.min(W, H) / 220; // scale factor relative to design size

		let t = 0;
		let raf: number;

		function colors() {
			return document.documentElement.dataset.theme === 'light'
				? { a: '0,85,255', g: '77,142,255' }
				: { a: '59,130,246', g: '96,165,250' };
		}

		const rings = [
			{ r: 44, speed: 0.75,  dots: 1, dr: 3.5, lineA: 0.14 },
			{ r: 74, speed: -0.46, dots: 2, dr: 2.5, lineA: 0.09 },
			{ r: 102, speed: 0.29, dots: 3, dr: 2.0, lineA: 0.06 },
		];

		function draw() {
			ctx.clearRect(0, 0, W, H);
			t += 0.005;

			const { a, g } = colors();

			// Ambient bg glow
			const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 95 * s);
			bg.addColorStop(0, `rgba(${a},0.06)`);
			bg.addColorStop(1, `rgba(${a},0)`);
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, W, H);

			// Core
			const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 15 * s);
			core.addColorStop(0, `rgba(${g},0.95)`);
			core.addColorStop(0.45, `rgba(${a},0.45)`);
			core.addColorStop(1, `rgba(${a},0)`);
			ctx.beginPath();
			ctx.arc(cx, cy, 15 * s, 0, Math.PI * 2);
			ctx.fillStyle = core;
			ctx.fill();

			ctx.beginPath();
			ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${g},1)`;
			ctx.fill();

			// Rings + orbiting dots
			for (const ring of rings) {
				const r = ring.r * s;
				const dr = ring.dr * s;

				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(${a},${ring.lineA})`;
				ctx.lineWidth = 0.5;
				ctx.stroke();

				for (let i = 0; i < ring.dots; i++) {
					const angle = t * ring.speed * Math.PI * 2 + (i / ring.dots) * Math.PI * 2;
					const px = cx + Math.cos(angle) * r;
					const py = cy + Math.sin(angle) * r;

					const halo = ctx.createRadialGradient(px, py, 0, px, py, dr * 4);
					halo.addColorStop(0, `rgba(${g},0.8)`);
					halo.addColorStop(1, `rgba(${a},0)`);
					ctx.beginPath();
					ctx.arc(px, py, dr * 4, 0, Math.PI * 2);
					ctx.fillStyle = halo;
					ctx.fill();

					ctx.beginPath();
					ctx.arc(px, py, dr, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(${g},1)`;
					ctx.fill();
				}
			}

			raf = requestAnimationFrame(draw);
		}

		draw();
		return () => cancelAnimationFrame(raf);
	});
</script>

<canvas bind:this={canvas} class="w-full h-full" />

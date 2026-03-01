<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		// Only on fine-pointer devices (mouse/trackpad)
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const ctx = canvas.getContext('2d')!;
		let mouseX = -9999;
		let mouseY = -9999;
		let entered = false;

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize, { passive: true });

		function onMove(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			entered = true;
		}
		window.addEventListener('mousemove', onMove, { passive: true });

		const TRAIL_LEN = 22;
		const pts: Array<{ x: number; y: number }> = [];
		let raf: number;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (entered) {
				pts.unshift({ x: mouseX, y: mouseY });
				if (pts.length > TRAIL_LEN) pts.length = TRAIL_LEN;
			}

			const isLight = document.documentElement.dataset.theme === 'light';

			for (let i = 0; i < pts.length; i++) {
				const t = 1 - i / TRAIL_LEN;
				const { x, y } = pts[i];
				const alpha = t * 0.72;
				const size = Math.max(0.5, t * 5.5);

				const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2.8);
				grad.addColorStop(0, isLight
					? `rgba(0,85,255,${alpha})`
					: `rgba(96,165,250,${alpha})`
				);
				grad.addColorStop(1, isLight
					? `rgba(0,85,255,0)`
					: `rgba(59,130,246,0)`
				);

				ctx.beginPath();
				ctx.arc(x, y, size * 2.8, 0, Math.PI * 2);
				ctx.fillStyle = grad;
				ctx.fill();
			}

			raf = requestAnimationFrame(draw);
		}

		draw();

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="fixed inset-0 pointer-events-none"
	style="z-index: 9999;"
/>

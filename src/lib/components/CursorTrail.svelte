<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const ctx = canvas.getContext('2d')!;

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize, { passive: true });

		// Trail points — more points for a longer, smoother slice
		const TRAIL = 36;
		let pts: { x: number; y: number }[] = [];
		let mouseX = -9999;
		let mouseY = -9999;
		let entered = false;

		function onMove(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			if (!entered) {
				// Initialize all points at the first cursor position
				for (let i = 0; i < TRAIL; i++) {
					pts.push({ x: mouseX, y: mouseY });
				}
				entered = true;
			}
		}
		window.addEventListener('mousemove', onMove, { passive: true });

		let raf: number;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (entered) {
				// The head interpolates toward the actual cursor
				pts[0].x += (mouseX - pts[0].x) * 0.5;
				pts[0].y += (mouseY - pts[0].y) * 0.5;

				// The rest follow their preceding node, acting like a springy rope
				for (let i = 1; i < TRAIL; i++) {
					pts[i].x += (pts[i - 1].x - pts[i].x) * 0.5;
					pts[i].y += (pts[i - 1].y - pts[i].y) * 0.5;
				}
			}

			if (pts.length < 2) {
				raf = requestAnimationFrame(draw);
				return;
			}

			const isLight = document.documentElement.dataset.theme === 'light';
			const baseColor = isLight ? '0,85,255' : '96,165,250';
			const glowColor = isLight ? '0,85,255' : '59,130,246';

			// ── Glow pass (wide, very faint) ──
			ctx.save();
			ctx.lineWidth = 8;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			const glowGrad = ctx.createLinearGradient(
				pts[pts.length - 1].x, pts[pts.length - 1].y,
				pts[0].x, pts[0].y
			);
			glowGrad.addColorStop(0, `rgba(${glowColor},0)`);
			glowGrad.addColorStop(0.6, `rgba(${glowColor},0.06)`);
			glowGrad.addColorStop(1, `rgba(${glowColor},0.18)`);

			ctx.strokeStyle = glowGrad;
			ctx.beginPath();
			ctx.moveTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
			for (let i = pts.length - 2; i >= 1; i--) {
				const mx = (pts[i].x + pts[i - 1].x) / 2;
				const my = (pts[i].y + pts[i - 1].y) / 2;
				ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
			}
			ctx.lineTo(pts[0].x, pts[0].y);
			ctx.stroke();
			ctx.restore();

			// ── Slice pass (thin, sharp) ──
			ctx.save();
			ctx.lineWidth = 1.5;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			const sliceGrad = ctx.createLinearGradient(
				pts[pts.length - 1].x, pts[pts.length - 1].y,
				pts[0].x, pts[0].y
			);
			sliceGrad.addColorStop(0, `rgba(${baseColor},0)`);
			sliceGrad.addColorStop(0.4, `rgba(${baseColor},0.15)`);
			sliceGrad.addColorStop(1, `rgba(${baseColor},0.85)`);

			ctx.strokeStyle = sliceGrad;
			ctx.beginPath();
			ctx.moveTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
			for (let i = pts.length - 2; i >= 1; i--) {
				const mx = (pts[i].x + pts[i - 1].x) / 2;
				const my = (pts[i].y + pts[i - 1].y) / 2;
				ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
			}
			ctx.lineTo(pts[0].x, pts[0].y);
			ctx.stroke();
			ctx.restore();

			// ── Tip dot ──
			const tip = pts[0];
			const tipGrad = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 4);
			tipGrad.addColorStop(0, `rgba(${baseColor},0.9)`);
			tipGrad.addColorStop(1, `rgba(${baseColor},0)`);
			ctx.beginPath();
			ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
			ctx.fillStyle = tipGrad;
			ctx.fill();

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
	style="z-index: 9998;"
/>

import Canvas from '../modules/graph2D/Canvas';

export default function useCanvas(render = (FPS: number) => { }) {
	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			// @ts-ignore
			window.webkitRequestAnimationFrame ||
			// @ts-ignore
			window.mozRequestAnimationFrame ||
			// @ts-ignore
			window.oRequestAnimationFrame ||
			// @ts-ignore
			window.msRequestAnimationFrame ||git add .
			// @ts-ignore
			function (callback) {
				window.setTimeout(callback, 15);
			}
	})();
	let FPS = 0;
	let outFPS = 0;
	let lastTimestamp = Date.now();
	const animLoop = () => {
		FPS++;
		const timestamp = Date.now();
		if (timestamp - lastTimestamp >= 1000) {
			outFPS = FPS;
			FPS = 0;
			lastTimestamp = timestamp;
		}
		render(outFPS);
		window.requestAnimationFrame(animLoop);
	};
	return (params) => {
		animLoop();
		return new Canvas(params);
	};
};
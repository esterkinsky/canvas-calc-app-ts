import React, { useEffect, useRef } from 'react';
import Graph2DFuncs from '../../modules/graph2D/Graph2DFuncs'
import useCanvas from '../../hooks/useCanvas';
import UI from './UI';

const Graph2D: React.FC = () => {
	const height = window.innerHeight - 100;
	const width = window.innerWidth - 20;
	const prop = width / height;
	const WIN = {
		LEFT: -10 * prop,
		BOTTOM: -10,
		WIDTH: 20 * prop,
		HEIGHT: 20,
	}
	let canMove = false;
	let zoomStep = 1;
	const funcs: any[] = [];
	let mousePosX = 0;

	const canvas: any = useRef(null);
	const canvasElem: any = useRef(null);
	const graph2D: any = useRef(null);
	const Canvas: any = useCanvas(() => renderGraph());

	useEffect(() => {
		canvas.current = Canvas({
			elem: canvasElem.current,
			WIN: WIN,
			width: width,
			height: height,
			callbacks: {
				wheel,
				mouseUp,
				mouseDown,
				mouseMove,
				mouseLeave,
			}
		})

		graph2D.current = new Graph2DFuncs(WIN, canvas.current);

		return () => {
			canvas.current = null;
		}
	})

	const wheel = (event: WheelEvent) => {
		event.preventDefault()
		const delta = (event.deltaY > 0) ? -zoomStep : zoomStep;
		if (WIN.WIDTH + delta * prop > 0 && WIN.HEIGHT + delta > 0) {
			WIN.WIDTH += prop * delta;
			WIN.HEIGHT += delta;
			WIN.LEFT -= prop * delta / 2;
			WIN.BOTTOM -= delta / 2;
		}
	}

	const mouseUp = () => {
		canMove = false;
	}

	const mouseDown = () => {
		canMove = true;
	}

	const mouseMove = (event: MouseEvent) => {
		if (canvas.current !== null) {
			if (canMove) {
				WIN.LEFT -= canvas.current.sx(event.movementX);
				WIN.BOTTOM -= canvas.current.sy(event.movementY);
			}
			mousePosX = WIN.LEFT + canvas.current.sx(event.offsetX);
		}
	}

	const mouseLeave = () => {
		canMove = false;
	}

	const renderGraph = () => {
		if (canvas.current) {
			canvas.current.clear()
			graph2D.current.grid();
			graph2D.current.printNums();
			graph2D.current.printOXY();
			funcs.forEach((func: any) => {
				if (func) {
					const { color, width, a, b, showDerivative, showIntegral } = func;
					let f;
					try {
						eval(`f = function (x) {return ${func.func}}`);
					} catch (e) {
						console.log(e);
					}
					if (f) {
						graph2D.current.printFunction(f, color, width);
						if (showDerivative) {
							graph2D.current.printDerivative(f, mousePosX);
						}
						if ((a || b) && a !== b) {
							if (showIntegral) {
								if (a > b) {
									graph2D.current.printIntegral(f, b, a, graph2D.getIntegral(f, b, a));
								} else {
									graph2D.current.printIntegral(f, a, b, graph2D.getIntegral(f, a, b))
								}
							}
							if (graph2D.getZero(f, a, b) !== null) {
								canvas.current.point(graph2D.getZero(f, a, b), 0);
							}
						}
					}
				}
			});

			canvas.current.renderCanvas();
		}
	}

	const delFunction = (num: any) => {
		funcs[num] = null;
	}

	return (
		<>
			<UI
				funcsList={funcs}
				delFunc={delFunction}
			/>
			<canvas id="graph" ref={canvasElem}></canvas>
		</>
	)
}

export default Graph2D;
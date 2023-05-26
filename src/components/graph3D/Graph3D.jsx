import React, { useEffect } from 'react';

import Math3D, { 
	Point, Light, Sphere, Cube, Cone, Ellipsoid, Cylinder, 
	ParabolicCylinder, HyperbolicCylinder, EllipticParaboloid, 
	HyperbolicParaboloid 
} from '../../modules/graph3D';
import useCanvas from '../../hooks/useCanvas';

import UI3D from './UI3D';

import './Graph3D.module.css';

const Graph3D = () => {
	const width = 800;
	const height = 600;
	const prop = width / height;
	const figures = [new Cone()];
	const WIN = {
		LEFT: -10 * prop,
		BOTTOM: -10,
		WIDTH: 20 * prop,
		HEIGHT: 20,
		CAMERA: new Point(0, 0, 50),
		DISPLAY: new Point(0, 0, 30)
	}
	const math3D = new Math3D({
		WIN: WIN
	});
	const LIGHT = new Light(-30, 0, 0, 20000);

	const show = {
		isPointsAllow: true,
		isEdgesAllow: false,
		isPolysAllow: true,
		isAnimationAllow: false,
		isShadowsAllow: false,
	}

	setInterval(() => {
		doAnimation()
	}, 10)

	let canMove = false;
	let dx = 0;
	let dy = 0;

	const canvas1 = useCanvas((FPS) => renderScene(FPS));
	let canvas = null;

	useEffect(() => {
		canvas = canvas1({
			id: 'canvas3D',
			WIN: WIN,
			width: width,
			height: height,
			callbacks: {
				wheel: event => wheel(event),
				mouseMove: event => mouseMove(event),
				mouseDown: event => mouseDown(event),
				mouseUp: () => mouseUp(),
				mouseLeave: () => mouseLeave()
			}
		})

		return () => {
			canvas = null;
		}
	})

	const doAnimation = () => {
		if (show.isAnimationAllow === true) {
			const gradus = -Math.PI / 170;
			const matrix = math3D.rotateOx(gradus);
			figures.forEach(figure => {
				if (figure) {
					figure.points.forEach(point => {
						math3D.transform(matrix, point);
					});
				}
			});
		}
	}

	const addFigure = (figure, num) => {
		switch (figure) {
			case 'Cube':
				figures[num] = new Cube();
				break;

			case 'Sphere':
				figures[num] = new Sphere();
				break;

			case 'Cone':
				figures[num] = new Cone();
				break;

			case 'Ellipsoid':
				figures[num] = new Ellipsoid();
				break;

			case 'Cylinder':
				figures[num] = new Cylinder();
				break;

			case 'ParabolicCylinder':
				figures[num] = new ParabolicCylinder();
				break;

			case 'HyperbolicCylinder':
				figures[num] = new HyperbolicCylinder();
				break;

			case 'EllipticParaboloid':
				figures[num] = new EllipticParaboloid();
				break;

			case 'HyperbolicParaboloid':
				figures[num] = new HyperbolicParaboloid();
				break;

			default:
				break;
		}
	}

	const delFigure = (num) => {
		figures[num] = null;
	}

	const check = (name) => {
		show[name] = !show[name];
	}

	const powerOfLight = () => {
		LIGHT.lumen = document.getElementById('powerOfLight').value;
	}

	const selectColor = () => {
		figures.forEach(figure => {
			if (figure) {
				figure.polygons.forEach(polygon => {
					polygon.color = polygon.hexToRgb(document.getElementById('colorSelector').value);
				});
			}
		});
	}

	const wheel = (event) => {
		event.preventDefault();
		const delta = (event.wheelDeltaY > 0) ? 1.1 : 0.9;
		const matrix = math3D.zoom(delta);
		figures.forEach(figure => {
			if (figure) {
				figure.points.forEach(point => {
					math3D.transform(matrix, point)
				});
			}
		});
	}

/* 	const moveFigures = (dx, dy, dz) => {
		const matrix = math3D.move(dx, dy, dz);
		figures.forEach((figure) => {
			if (figure) {
				figure.points.forEach(point => {
					math3D.transform(matrix, point);
				});
			}
		});
	}
 */

	const mouseMove = (event) => {
		if (canMove) {
			const gradus = Math.PI / 180;
			const matrixY = math3D.rotateOy((dy - event.offsetY) * gradus);
			const matrixX = math3D.rotateOx((dx - event.offsetX) * gradus);
			figures.forEach(figure => {
				if (figure) {
					figure.points.forEach(point => {
						math3D.transform(matrixY, point);
						math3D.transform(matrixX, point);
					});
				}
			});
			dx = event.offsetX;
			dy = event.offsetY;
		}
	}

	const mouseDown = (event) => {
		canMove = true;
		dx = event.offsetX
		dy = event.offsetY
	}

	const mouseLeave = () => {
		canMove = false;
	}

	const mouseUp = () => {
		canMove = false;
	}

	const renderScene = () => {
		if(canvas)
	{	canvas.clear();
		if (show.isPolysAllow) {
			const polygons = [];
			figures.forEach((figure, figureIndex) => {
				if (figure) {
					math3D.calcCenters(figure);
					math3D.normVector(figure);
					math3D.calcRadius(figure);
					math3D.calcDistance(figure, WIN.CAMERA, 'distance');
					math3D.calcDistance(figure, LIGHT, 'lumen');
					figure.polygons.forEach(polygon => {
						polygon.figureIndex = figureIndex;
						polygons.push(polygon);
					})
				};
			});

			math3D.sortByArtistAlgoritm(polygons);

			polygons.forEach((polygon) => {
				const points = [];

				for (let i = 0; i < polygon.points.length; i++) {
					points.push(figures[polygon.figureIndex].points[polygon.points[i]]);
				}

				const { dark } = math3D.calcShadow(polygon, figures, LIGHT);
				const lumen = math3D.calcIlluminationDistance(polygon.lumen, LIGHT.lumen * (show.isShadowsAllow ? dark : 1));
				var { r, g, b } = polygon.color;
				r = Math.round(r * lumen);
				g = Math.round(g * lumen);
				b = Math.round(b * lumen);
				canvas.polygon(points.map(point => {
					return {
						x: math3D.xs(point),
						y: math3D.ys(point)
					}
				}), polygon.rgbToColor(r, g, b));
			})
		}

		if (show.isEdgesAllow) {
			figures.forEach(figure => {
				if (figure) {
					figure.edges.forEach(edge => {
						const point1 = figure.points[edge.p1];
						const point2 = figure.points[edge.p2];
						canvas.line(
							math3D.xs(point1),
							math3D.ys(point1),
							math3D.xs(point2),
							math3D.ys(point2),
							1, 'grey'
						);
					});
				};
			});
		}

		if (show.isPointsAllow) {
			figures.forEach(figure => {
				if (figure) {
					figure.points.forEach(point => {
						canvas.point(math3D.xs(point), math3D.ys(point), 'grey');
					});
				}
			});
		}
		canvas.renderCanvas();}
	}

	return <>
		<div>
			<UI3D
				check={(name) => check(name)}
				addFigure={(figure, num) => addFigure(figure, num)}
				delFigure={(num) => delFigure(num)}
				selectColor={() => selectColor()}
				show={show}
				powerOfLight={() => powerOfLight()}
				LIGHT={LIGHT}
			/>
		</div>
		<canvas id="canvas3D" className='graph3d'></canvas>
	</>
}

export default Graph3D;
import {Point, Edge, Polygon, FigureBody } from '../index'

export  default class EllipticParaboloid extends FigureBody {
	constructor(count = 30, color) {
		const points = [];
		const edges = [];
		const polygons = [];
		const PI = Math.PI;
		let delta = 2 * PI / count;
		let R = 80;

		for (let i = 0; i <= PI; i += delta) {
			for (let j = 0; j < 2 * PI; j += delta) {
				const x = R * Math.sin(i) * Math.cos(j) / 8;
				const y = R * Math.sin(i) * Math.sin(j) / 8;
				const z = x * x / 8 + y * y / 8;
				points.push(new Point(x, y, z));
			}
		}

		for (let i = 0; i < points.length; i++) {
			if ((i + 1) < points.length && (i + 1) % count !== 0) {
				edges.push(new Edge(i, i + 1))
			}
			if ((i + 1) % count === 0) {
				edges.push(new Edge(i, i + 1 - count))
			}
			if (i + count < points.length) {
				edges.push(new Edge(i, i + count))
			}
		}

		for (let i = 0; i < points.length; i++) {
			if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
				polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
			} else if ((i + count) < points.length && (i + 1) % count === 0) {
				polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
			}
		}
		super(points, edges, polygons, color);
	}
}
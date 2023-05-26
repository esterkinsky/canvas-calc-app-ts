import { Point, Edge, Polygon, FigureBody } from '../index'

export  default class Ellipsoid extends FigureBody {
	constructor(x = 14, y = 10, z = 14, edgeLines = 20, color) {
		const edges = [];
		const points = [];
		const polygons = [];
		const T = Math.PI / edgeLines;
		const F = 2 * Math.PI / edgeLines;

		for (let i = 0; i <= Math.PI; i += T) {
			for (let j = 0; j < 2 * Math.PI; j += F) {
				points.push(new Point(
					x * Math.sin(i) * Math.sin(j),
					y * Math.cos(i),
					z * Math.sin(i) * Math.cos(j)
				));
			}
		}

		for (let i = 0; i < points.length; i++) {
			if (points[i + 1]) {
				if ((i + 1) % edgeLines === 0) {
					edges.push(new Edge(i, i + 1 - edgeLines));
				} else {
					edges.push(new Edge(i, i + 1));
				}
			}
			if (points[i + edgeLines]) {
				edges.push(new Edge(i, i + edgeLines));
			}
		}
		edges.push(new Edge(points.length - edgeLines, points.length - 1));

		for (let i = 0; i < points.length; i++) {
			if (points[i + edgeLines + 1]) {
				if ((i + 1) % edgeLines === 0) {
					polygons.push(new Polygon([i, i - edgeLines + 1, i + 1, i + edgeLines]));
				} else
					polygons.push(new Polygon([i, i + 1, i + edgeLines + 1, i + edgeLines]));
			}
		}
		polygons.push(new Polygon([points.length - 1, points.length - edgeLines - 1, points.length - 2 * edgeLines, points.length - edgeLines]));
		super(points, edges, polygons, color);
	}
}
import { Point, Edge, Polygon, FigureBody } from '../index'

export  default class Cylinder extends FigureBody {
	constructor(x = 5, y = 10, z = 4, edgeLines = 10, color) {
		const edges = [];
		const points = [];
		const polygons = [];
		const deltaY = y / edgeLines;
		const deltaT = (2 * Math.PI) / edgeLines;

		for (let j = -y; j < y; j += deltaY) {
			for (let i = 0; i < 2 * Math.PI; i += deltaT) {
				points.push(new Point(
					x = y * Math.cos(i),
					j,
					z = y * Math.sin(i),
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

		polygons.push(new Polygon([
			points.length - 1,
			points.length - edgeLines - 1,
			points.length - 2 * edgeLines,
			points.length - edgeLines]));
		super(points, edges, polygons, color);
	}
}
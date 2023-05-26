import { Point, Edge, Polygon, FigureBody } from '../index'

export  default class HyperbolicCylinder extends FigureBody {
	constructor(count = 20, color) {
		const points = [];
		const polygons = [];
		const edges = [];
		const size = 20;
		const delta = size / count;

		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				const x = i * delta - size / 2;
				const z = j * delta;
				let y = 5 / x;
				points.push(new Point(x, y, z));
			}
		}

		for (let i = 0; i < points.length; i++) {
			if (i + 1 < points.length && (i + 1) % count !== 0) {
				edges.push(new Edge(i, i + 1));
			}
			if (i + count < points.length) {
				edges.push(new Edge(i, i + count));
			}
			if (i + 1 + count < points.length && (i + 1) % count !== 0) {
				polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
			}
		}
		super(points, edges, polygons, color);
	}
}
import { Point, Edge, Polygon, FigureBody } from '../index'

export default class Cone extends FigureBody {
	constructor(count = 20, crcs = 10, rad = 10, color) {
		const points = [];
		const edges = [];
		const polygons = [];

		for (let beta = Math.PI / 2; beta >= -Math.PI; beta -= Math.PI / crcs) {
			let r = Math.cos(beta) * rad;
			for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI / count * 2) {
				let x = Math.cos(alpha) * r;
				let y = r;
				let z = Math.sin(alpha) * r;
				points.push(new Point(x, y, z));
			}
		}

		for (let i = 0; i < points.length; i++) {
			if (i % count === 0 && i !== 0) {
				edges.push(new Edge(i, i + 1));
			} else {
				if (i + 1 < points.length && (i + 1) % count !== 0) {
					edges.push(new Edge(i, i + 1));
				} else {
					edges.push(new Edge(i, i + 1 - count));
				}
			}
			if (i + count < points.length) {
				edges.push(new Edge(i, i + count));
			}
		}
		
		for (let i = 0; i < points.length; i++) {
			if ((i + 1 + count) < points.length && ((i + 1) % count) !== 0) {
				polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
			} else if ((i + count) < points.length && ((i + 1) % count) === 0) {
				polygons.push(new Polygon([i, i - count + 1, i + 1, i + count], color));
			}
		}
		super(points, edges, polygons, color);
	}
}
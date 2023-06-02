import Edge from './Edge';
import Point from './Point';
import Polygon from './Polygon';

export default class FigureBody {

	points: Point[];
	edges: Edge[];
	polygons: Polygon[];
	name: string;
	color: string;

	constructor(points = [], edges = [], polygons = [], name = '', color = '#ff37a8') {
		this.points = points;
		this.edges = edges;
		this.polygons = polygons;
		this.name = name;
		this.color = color;
	}
}
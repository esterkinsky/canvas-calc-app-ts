export default class FigureBody {
	constructor(points = [], edges = [], polygons = [], name = '', color = '#ff37a8') {
		this.points = points;
		this.edges = edges;
		this.polygons = polygons;
		this.name = name;
		this.color = color;
	}
}
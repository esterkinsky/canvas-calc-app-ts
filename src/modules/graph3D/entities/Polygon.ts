import Point from './Point';

export default class Polygon {
	constructor(points = [], color = '#ebebeb') {
		this.points = points;
		this.center = new Point();
		this.color = this.hexToRgb(color);
		this.distance = 0;
		this.lumen = 1;
		this.R = 1;
		this.figureIndex = 0;
		this.normVector = 0;
	}

	hexToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : { r: 0, g: 0, b: 0 };
	}
	rgbToColor(r, g, b) {
		return `rgb(${r}, ${g}, ${b})`;
	}
}
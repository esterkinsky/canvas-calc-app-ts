import Point from './Point';

export default class Light extends Point {
	lumen: number;
	constructor(x: number, y: number, z: number, lumen = 10000) {
		super(x, y, z);
		this.lumen = lumen;
	}
}
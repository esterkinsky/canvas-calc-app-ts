export default class Graph2DFuncs {
	constructor(WIN, canvas) {
		this.WIN = WIN;
		this.canvas = canvas;
	} 

	getDerivative = (f, x0, dx = 0.00001) => {
		return (f(x0 + dx) - f(x0)) / dx;
	}

	printDerivative = (f, x) => {
		const dx = Math.pow(10, -9),
			k = (f(x + dx) - f(x)) / dx,
			b = f(x) - k * x,
			x1 = this.WIN.LEFT,
			x2 = this.WIN.LEFT + this.WIN.WIDTH,
			y1 = k * x1 + b,
			y2 = k * x2 + b;
		this.canvas.line(x1, y1, x2, y2, 1, '#7417b3', true);
	}

	 printOXY () {
		 this.canvas.line(0, this.WIN.BOTTOM, 0, this.WIN.HEIGHT + this.WIN.BOTTOM, 2, '#787d85')
		 this.canvas.line(this.WIN.LEFT, 0, this.WIN.WIDTH + this.WIN.LEFT, 0, 2, '#787d85')

		 this.canvas.line(this.WIN.WIDTH + this.WIN.LEFT, 0, this.WIN.WIDTH + this.WIN.LEFT - 0.6, 0.20, 2, '#787d85');
		 this.canvas.line(this.WIN.WIDTH + this.WIN.LEFT, 0, this.WIN.WIDTH + this.WIN.LEFT - 0.6, - 0.20, 2, '#787d85')
		 this.canvas.line(0, this.WIN.HEIGHT + this.WIN.BOTTOM, - 0.20, this.WIN.HEIGHT + this.WIN.BOTTOM - 0.6, 2, '#787d85')
		 this.canvas.line(0, this.WIN.HEIGHT + this.WIN.BOTTOM, 0.20, this.WIN.HEIGHT + this.WIN.BOTTOM - 0.6, 2, '#787d85')
	}

	grid () {
		for (var i = 0; i < this.WIN.HEIGHT + this.WIN.BOTTOM; i++) {
			this.canvas.line(this.WIN.LEFT, i, this.WIN.WIDTH + this.WIN.LEFT, i, 1, '#d7d7d7')
			this.canvas.line(0.1, i, -0.1, i, '#A4A4A4')
		}
		for (var j = 0; j > this.WIN.BOTTOM; j--) {
			this.canvas.line(this.WIN.LEFT, j, this.WIN.WIDTH + this.WIN.LEFT, j, 1, '#d7d7d7')
			this.canvas.line(0.1, j, -0.1, j, '#787d85')
		}
		for (var k = 0; k < this.WIN.WIDTH + this.WIN.LEFT; k++) {
			this.canvas.line(k, this.WIN.BOTTOM, k, this.WIN.HEIGHT + this.WIN.BOTTOM, 1, '#d7d7d7')
			this.canvas.line(k, 0.1, k, -0.1, '#787d85')
		}
		for (var l = 0; l > this.WIN.LEFT; l--) {
			this.canvas.line(l, this.WIN.BOTTOM, l, this.WIN.HEIGHT + this.WIN.BOTTOM, 1, '#d7d7d7')
			this.canvas.line(l, 0.1, l, -0.1, 1, '#787d85')
		}
	}

	printNums = () => {
		const shiftY = -this.WIN.HEIGHT * 0.01 - 0.04;
		const shiftX = this.WIN.WIDTH * 0.001 + 0.04;
		for (let i = Math.round(this.WIN.LEFT); i < this.WIN.LEFT + this.WIN.WIDTH; i++) {
			this.canvas.printText(i, i + shiftX, shiftY,);
		}
		for (let i = Math.round(this.WIN.BOTTOM); i < this.WIN.BOTTOM + this.WIN.HEIGHT; i++) {
			this.canvas.printText(i, shiftX, i + shiftY,);
		}
	}

	printFunction(f, color = 'black', lineWidth = 2) {
		const { WIDTH, LEFT, HEIGHT } = this.WIN;
		const dx = WIDTH / 1000;
		let x = LEFT;

		while (x < WIDTH + LEFT) {
			const y1 = f(x);
			const y2 = f(x + dx);
			if (Math.abs(y1 - y2) < HEIGHT) {
				this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color);
			}
			else {
				this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color, true);
			}
			x += dx;
		}
	}

	printIntegral(f, a, b, integral, d = 100, color = '#dbadec') {
		const dx = (b - a) / d;
		let x = a;
		const points = [];
		points.push({ x: a, y: 0 })
		while (x <= b) {
			points.push({ x, y: f(x) });
			x += dx;
		}
		points.push({ x: b, y: f(b) })
		points.push({ x: b, y: 0 })
		this.canvas.polygon(points, color);
		this.canvas.line(a, 0, b, 0, 2, 'orange');
	}

	getIntegral(f, a, b, d = 100) {
		const dx = (b - a) / d;
		let x = a;
		let S = 0;
		while (x <= b) {
			S += (f(x) + f(x + dx)) / 2 * dx;
			x += dx;
		}
		return S;
	}

	getZero(f, a, b, eps = 0.0001) {
		if (f(a) * f(b) > 0) return null;
		if (f(a) === 0) return a;
		if (f(b) === 0) return b;
		if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
		const half = (a + b) / 2;
		if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
		if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
		else return null;
	}
}
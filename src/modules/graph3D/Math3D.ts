export default class Math3D {
	constructor({ WIN }) {
		this.WIN = WIN;
	};

	xs(point) {
		return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
	};

	ys(point) {
		return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
	};

	multMatrix(T = [], m = []) {
		const matrStr = [0, 0, 0, 0]
		for (let j = 0; j < T.length; j++) {
			for (let i = 0; i < T[j].length; i++) {
				matrStr[j] += T[j][i] * m[i];
			};
		};
		return matrStr;
	};

	calcVector(a, b) {
		return {
			x: b.x - a.x,
			y: b.y - a.y,
			z: b.z - a.z
		};
	};

	vectProd(a, b) {
		return {
			x: a.y * b.z - a.z * b.y,
			y: a.z * b.x - a.x * b.z,
			z: a.x * b.y - a.y * b.x
		};
	};

	calcVectModule(a) {
		return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	};

	calcRadius(figure) {
		const points = figure.points;
		figure.polygons.forEach(polygon => {
			const center = polygon.center;
			const p1 = points[polygon.points[0]];
			const p2 = points[polygon.points[1]];
			const p3 = points[polygon.points[2]];
			const p4 = points[polygon.points[3]];
			polygon.R = (
				this.calcVectModule(this.calcVector(center, p1)) +
				this.calcVectModule(this.calcVector(center, p2)) +
				this.calcVectModule(this.calcVector(center, p3)) +
				this.calcVectModule(this.calcVector(center, p4))) / 4;
		});
	};

	calcShadow(polygon, figures, LIGHT) {
		const M1 = polygon.center;
		const r = polygon.R;
		const S = this.calcVector(M1, LIGHT);
		for (let i = 0; i < figures.length; i++) {
			if (figures[i]) {
				if (polygon.figureIndex === 1) {
					continue;
				}
				for (let j = 0; j < figures[i].polygons.length; j++) {
					const polygon2 = figures[i].polygons[j];
					const M0 = polygon2.center;
					if (polygon.lumen > polygon2.lumen) {
						continue;
					}
					const dark = this.calcVectModule(this.vectProd(this.calcVector(M0, M1), S)) / this.calcVectModule(S);
					if (dark < r) {
						return {
							isShadow: true,
							dark: dark / 1.3,
						}
					}
				}
			}
		}
		return { isShadow: false }
	};

	mult(matrix, point) {
		const c = [0, 0, 0, 0];
		for (let i = 0; i < 4; i++) {
			let s = 0;
			for (let j = 0; j < 4; j++) {
				s += matrix[j][i] * point[j];
			}
			c[i] = s;
		}
		return c;
	}

	normVector(figure) {
		figure.polygons.forEach(polygon => {
			const edge1 = {
				x: (figure.points[polygon.points[2]].x - figure.points[polygon.points[0]].x),
				y: (figure.points[polygon.points[2]].y - figure.points[polygon.points[0]].y),
				z: (figure.points[polygon.points[2]].z - figure.points[polygon.points[0]].z)
			}
			const edge2 = {
				x: (figure.points[polygon.points[1]].x - figure.points[polygon.points[0]].x),
				y: (figure.points[polygon.points[1]].y - figure.points[polygon.points[0]].y),
				z: (figure.points[polygon.points[1]].z - figure.points[polygon.points[0]].z)
			}
			return polygon.norm = this.vectProd(edge1, edge2);
		});
	};

	transform(matrix, point) {
		const array = this.multMatrix(
			matrix,
			[point.x, point.y, point.z, 1]
		);
		point.x = array[0];
		point.y = array[1];
		point.z = array[2];
	};

	zoom(delta) {
		return [
			[delta, 0, 0, 0],
			[0, delta, 0, 0],
			[0, 0, delta, 0],
			[0, 0, 0, 1]
		];
	};

	move(dx, dy, dz) {
		return [
			[1, 0, 0, dx],
			[0, 1, 0, dy],
			[0, 0, 1, dz],
			[0, 0, 0, 1]
		];
	};

	rotateOy(alpha) {
		return [
			[1, 0, 0, 0],
			[0, Math.cos(alpha), Math.sin(alpha), 0],
			[0, -(Math.sin(alpha)), Math.cos(alpha), 0],
			[0, 0, 0, 1]
		];
	};

	rotateOx(alpha) {
		return [
			[Math.cos(alpha), 0, -(Math.sin(alpha)), 0],
			[0, 1, 0, 0],
			[Math.sin(alpha), 0, Math.cos(alpha), 0],
			[0, 0, 0, 1]
		];
	};

	rotateOz(alpha) {
		return [
			[Math.cos(alpha), Math.sin(alpha), 0, 0],
			[-(Math.sin(alpha)), Math.cos(alpha), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		];
	};

	calcIlluminationDistance(distance, lumen) {
		const result = distance ? lumen / Math.pow(distance, 3) : 1;
		return result > 1 ? 1 : result;
	};

	calcCenters(figure) {
		figure.polygons.forEach(polygon => {
			const points = polygon.points;
			let x = 0, y = 0, z = 0;
			for (let j = 0; j < points.length; j++) {
				x += figure.points[points[j]].x;
				y += figure.points[points[j]].y;
				z += figure.points[points[j]].z;
			}
			polygon.center.x = x / points.length;
			polygon.center.y = y / points.length;
			polygon.center.z = z / points.length;
		});
	};

	calcDistance(figure, endPoint, name) {
		figure.polygons.forEach(polygon => {
			polygon[name] = Math.sqrt(
				Math.pow(endPoint.x - polygon.center.x, 2) +
				Math.pow(endPoint.y - polygon.center.y, 2) +
				Math.pow(endPoint.z - polygon.center.z, 2)
			)
		});
	};

	sortByArtistAlgoritm(polygons) {
		polygons.sort((a, b) => b.distance - a.distance);
	};

	calcNormVectors(figure) {
		figure.polygons.forEach((polygon) => {
			polygon.normVector = [
				polygon.centre.x - figure.centre.x,
				polygon.centre.y - figure.centre.y,
				polygon.centre.z - figure.centre.z,
			]
		})
	}
}
import { Point } from "../graph3D";

export type TWIN2D = {
	LEFT: number,
	BOTTOM: number,
	WIDTH: number,
	HEIGHT: number,
}

export type TWIN3D = TWIN2D & {
	FOCUS: Point,
	CAMERA: Point,
}
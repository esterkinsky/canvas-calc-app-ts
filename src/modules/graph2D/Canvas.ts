import { Point } from '../graph3D';
import { TWIN2D, TWIN3D } from './TWIN';

interface iCanvasProps {
	WIN: TWIN2D|TWIN3D,
	elem: HTMLCanvasElement;
	width: number,
	height: number,
	callbacks: iCallbacksProps,
}

interface iCallbacksProps {
	wheel:(event: WheelEvent) => void, 
	mouseUp: () => void, 
	mouseDown: () => void, 
	mouseMove:(event: MouseEvent) =>void, 
	mouseLeave: () => void
}

export default class Canvas {

	WIN: TWIN2D|TWIN3D;
	canvas: HTMLCanvasElement;
	canvasVirtual:HTMLCanvasElement;
	context: CanvasRenderingContext2D | null;
	contextVirtual:CanvasRenderingContext2D| null;

	constructor({ WIN, elem, width = 700, height = 700, callbacks }:iCanvasProps) {

		this.WIN = WIN;

		this.canvas = elem;
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext('2d');

		this.canvasVirtual = document.createElement('canvas');
		this.contextVirtual = this.canvasVirtual.getContext('2d');
		this.canvasVirtual.width = width;
		this.canvasVirtual.height = height;

		const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
		this.canvas.addEventListener('wheel', wheel);
		this.canvas.addEventListener('mousedown', mouseDown);
		this.canvas.addEventListener('mouseup', mouseUp);
		this.canvas.addEventListener('mousemove', mouseMove);
		this.canvas.addEventListener('mouseleave', mouseLeave);
	};

	xs(x:number)  {
			return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width
}
	ys(y:number)  {
			return this.canvas.height - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT * this.canvas.height;
}

	sx(x: number) {
		return x * this.WIN.WIDTH / this.canvas.width;
}
	sy(y: number) { 
		return -y * this.WIN.HEIGHT / this.canvas.height;
	
}

	drawRect (x: number, y: number, width: number, height: number, color = '#ebebeb')  {
if(this.contextVirtual)
		{const heightRect = height * this.canvas.height / this.WIN.HEIGHT;
		const widthRect = width * this.canvas.width / this.WIN.WIDTH;
		this.contextVirtual.fillStyle = color;
		this.contextVirtual.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);}
	};

	clear = () => {
		if (this.contextVirtual) {
		this.contextVirtual.fillStyle = '#ebebeb';
		this.contextVirtual.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};
}

	line = (x1: number, y1: number, x2: number, y2: number, width = 1, color = '#787d85', isDash = false) => {
		if (this.contextVirtual) {
		this.contextVirtual.beginPath();
		this.contextVirtual.strokeStyle = color;
		this.contextVirtual.moveTo(this.xs(x1), this.ys(y1));
		if (isDash) {
			this.contextVirtual.lineWidth = 1;
			this.contextVirtual.setLineDash([10, 10]);
		} else {
			this.contextVirtual.lineWidth = width;
			this.contextVirtual.setLineDash([]);
		}
		this.contextVirtual.lineTo(this.xs(x2), this.ys(y2));
		this.contextVirtual.stroke();
		this.contextVirtual.closePath();
	};
}

	printText(text:string, x: number, y: number, color = '#A4A4A4', size = NaN){
		if (this.contextVirtual){
		this.contextVirtual.font = `${size}px serif`;
		this.contextVirtual.fillStyle = color;
		this.contextVirtual.fillText(text, this.xs(x), this.ys(y));
		}
	};

	point  (x: number, y: number, color = 'grey', size = 5) {
		if (this.contextVirtual) {
		this.contextVirtual.beginPath();
		this.contextVirtual.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
		this.contextVirtual.fillStyle = color;
		this.contextVirtual.fill();
		this.contextVirtual.closePath();
		}
	};

	polygon  (points:Point[], color = '#f003')  {
		if (points.length >= 3) {
			if (this.contextVirtual) {
			this.contextVirtual.fillStyle = color;
			this.contextVirtual.strokeStyle = color;
			this.contextVirtual.beginPath();
			this.contextVirtual.moveTo(this.xs(points[0].x), this.ys(points[0].y));
			for (let i = 1; i < points.length; i++) {
				this.contextVirtual.lineTo(this.xs(points[i].x), this.ys(points[i].y));
			}
			this.contextVirtual.lineTo(this.xs(points[0].x), this.ys(points[0].y));
			this.contextVirtual.closePath();
			this.contextVirtual.fill();
			this.contextVirtual.stroke();
		};
	}
	};

	renderCanvas = () => {
		if (this.context) {
		this.context.drawImage(this.canvasVirtual, 0, 0);
		}
	}

};
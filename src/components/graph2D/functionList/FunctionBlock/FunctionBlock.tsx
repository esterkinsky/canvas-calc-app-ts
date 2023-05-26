import { useRef, useEffect, ChangeEvent } from 'react';
import './FunctionBlock.module.css';
import MyCheckBox from '../../../../elements/checkbox/MyCheckBox'

enum eFunc {
	func,
	color,
	width,
	a,
	b,
	showDerivative,
	showIntegral
}

interface iFuncBlockProps {
	func: { color: any, width: any, a: any, b: any, func: any, showDerivative: any, showIntegral: any, index: any },
	delFunc: Function
}

const FunctionBlock: React.FC<iFuncBlockProps> = ({ func, delFunc }) => {

	const refFunc = useRef<HTMLInputElement>(null);
	const refWidth = useRef<HTMLInputElement>(null);
	const refColor = useRef<HTMLInputElement>(null);
	const refA = useRef<HTMLInputElement>(null);
	const refB = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (refFunc.current != null && refWidth.current != null && refColor.current != null && refA.current != null && refB.current != null) {
			refFunc.current.value = func.func ? func.func : '';
			refWidth.current.value = func.width;
			refColor.current.value = func.color;
			refA.current.value = func.a ? func.a : '';
			refB.current.value = func.b ? func.b : '';
		}
	})

	const derivativeHandler = (event: React.MouseEvent) => {
		func.showDerivative = event;
	}

	const integralHandler = (event: React.MouseEvent) => {
		func.showIntegral = event;
	}

	const functionHandler = (event: ChangeEvent) => {
		func.func = (event.target as HTMLInputElement).value;
	}

	const widthHandler = (event: ChangeEvent) => {
		func.width = (event.target as HTMLInputElement).value;
	}

	const colorHandler = (event: ChangeEvent) => {
		func.color = (event.target as HTMLInputElement).value;
	}

	const aHandler = (event: ChangeEvent) => {
		func.a = (event.target as HTMLInputElement).value;
	}

	const bHandler = (event: ChangeEvent) => {
		func.b = (event.target as HTMLInputElement).value;
	}

	const deleteFuncHandler = () => {
		delFunc(func.index);
	}


	return (
		<>
			<input
				placeholder='f(x)'
				className='input-func'
				onChange={functionHandler}
				ref={refFunc}
			/>
			<input
				type='number'
				placeholder='Ширина'
				className='input-width'
				onChange={widthHandler}
				ref={refWidth}
			/>
			<input
				type='color'
				className='input-color'
				onChange={colorHandler}
				ref={refColor}
			/>

			<input
				placeholder='a'
				className='input-integral'
				onChange={aHandler}
				ref={refA}
			/>
			<input
				placeholder='b'
				className='input-integral'
				onChange={bHandler}
				ref={refB}
			/>
			<MyCheckBox
				text={"Производная"}
				onClick={derivativeHandler}
				checked={func.showDerivative}
			/>
			<MyCheckBox
				text={"Интеграл"}
				onClick={integralHandler}
				checked={func.showIntegral}
			/>
			<button
				className='delete-func-button'
				onClick={deleteFuncHandler}
			>x</button>
		</>
	)
}

export default FunctionBlock;
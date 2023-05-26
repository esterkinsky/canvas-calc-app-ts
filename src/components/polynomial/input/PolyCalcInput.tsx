import { RefObject } from 'react';
import './PolyCalcInput.module.css';

interface iPolyCalcInputProps {
	inputA: RefObject<HTMLTextAreaElement>,
	inputB: RefObject<HTMLTextAreaElement>,
}

const PolyCalcInput: React.FC<iPolyCalcInputProps> = ({ inputA, inputB}) => {
	return (
		<>
			<textarea
				className='number'
				placeholder="Полином"
				ref={inputA}
			></textarea>
			<textarea
				className='number'
				placeholder="Полином"
				ref={inputB}
			></textarea>
		</>
	)

}

export default PolyCalcInput;
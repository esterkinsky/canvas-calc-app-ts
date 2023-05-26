import { MouseEventHandler, RefObject } from 'react';
import './PolyRes.css';

interface iPolyResProps {
	onClick: MouseEventHandler<HTMLButtonElement>,
	inputX: RefObject<HTMLTextAreaElement>,
	result: RefObject<HTMLTextAreaElement>
}

const PolyRes: React.FC<iPolyResProps> = ({ onClick, inputX, result }) => {
	return (
		<div className='poly-result-container'>
			<textarea
				placeholder='X'
				ref={inputX}
			></textarea>
			<button
				onClick={onClick}
				placeholder={'Подставить X'}
			/>
			<textarea
				className='poly-result'
				disabled
				ref={result}
			></textarea>
		</div>
	)
}

export default PolyRes;
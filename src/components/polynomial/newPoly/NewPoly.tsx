import { RefObject } from 'react';
import './NewPoly.module.css';

interface iNewPolyProps {
	newPoly: RefObject<HTMLTextAreaElement>
}

const NewPoly: React.FC<iNewPolyProps> = ({ newPoly }) => {
	return (
		<>
			<textarea
				className='number'
				placeholder="Новый полином"
				ref={newPoly}
			></textarea>
		</>
	)
}

export default NewPoly;
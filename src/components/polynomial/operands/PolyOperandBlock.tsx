import { Key, MouseEventHandler} from 'react';
import './PolyOperandBlock.module.css';

interface iPolyOperandBlockProps {
	operandButtons: { operand: string; text: string; }[],
	onClick: MouseEventHandler<HTMLButtonElement>
}

const PolyOperandBlock: React.FC<iPolyOperandBlockProps> = ({ operandButtons, onClick }) => {
	return (
		<div className='buttons-calc'>
			{operandButtons.map((
				button: {
					operand: any;
					text: string | number | null | undefined;
				},
				index: Key | null | undefined) => {
				return (
					<div key={index}
						onClick={() => onClick(button.operand)}
					>{button.text}</div>
				)
			})}
		</div>
	)
}

export default PolyOperandBlock;
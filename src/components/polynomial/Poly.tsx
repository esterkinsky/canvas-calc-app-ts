import { useRef } from 'react';
import usePolyCalc from '../../hooks/usePolyCalc';
import usePolyResult from '../../hooks/usePolyResult';
import PolyCalcInput from './input/PolyCalcInput';
import NewPoly from './newPoly/NewPoly';
import PolyOperandBlock from './operands/PolyOperandBlock';
import PolyResult from './polyRes/PolyRes';

const Poly = () => {

	const refInputA = useRef<HTMLTextAreaElement>(null);
	const refInputB = useRef<HTMLTextAreaElement>(null);
	const refNewPoly = useRef<HTMLTextAreaElement>(null);
	const refResult = useRef<HTMLTextAreaElement>(null);
	const refInputX = useRef<HTMLTextAreaElement>(null);

	const polyCalc = usePolyCalc(refInputA, refInputB, refNewPoly);
	const polyResult = usePolyResult(refNewPoly, refInputX, refResult);

	const operandButtons = [
		{
			operand: 'add',
			text: 'a + b',
		},
		{
			operand: 'sub',
			text: 'a - b',
		},
		{
			operand: 'mult',
			text: 'a * b',
		},
	]

	return (
		<div className='calcsContainer'>
			<div className='containerC'>
				<PolyCalcInput
					inputA={refInputA}
					inputB={refInputB}
				/>
				<NewPoly
					newPoly={refNewPoly}
				/>
				<PolyOperandBlock
					operandButtons={operandButtons}
					onClick={polyCalc}
				/>
				<PolyResult
					onClick={polyResult}
					inputX={refInputX}
					result={refResult}
				/>
			</div>
		</div>
	);
}

export default Poly;
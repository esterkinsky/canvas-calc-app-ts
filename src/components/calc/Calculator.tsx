import { useRef } from 'react';
import useCalc from '../../hooks/useCalc'
import './Caclulator.module.css';

const Calculator = () => {

	const refA = useRef<HTMLTextAreaElement>(null);
	const refB = useRef<HTMLTextAreaElement>(null);
	const refRes = useRef<HTMLTextAreaElement>(null);

	const calc = useCalc(refA, refB, refRes);

	const clear = () => {
		if (refA.current != null && refB.current != null && refRes.current != null) {
			refA.current.value = ''
			refB.current.value = ''
			refRes.current.value = ''
		}
	}

	return <>
		<div className='calcsContainer'>
			<section>
				<div className='containerC'>
					<textarea ref={refA} placeholder="0" className='number'></textarea>
					<textarea ref={refB} placeholder="0" className='number' ></textarea>
					<textarea ref={refRes} className='resultNumber' id="resultNumber"></textarea>
					<div className='buttons'>
						<button onClick={() => clear()} id="clear" className='clear'>C</button>
						<button onClick={() => calc('add')} className='operands'>x + y</button>
						<button onClick={() => calc('sub')} className='operands' >x - y</button>
						<button onClick={() => calc('mult')} className='operands' >x * y</button>
						<button onClick={() => calc('div')} className='operands' >x / y</button>
						<button onClick={() => calc('pow')} className='operands' >x ^ y</button>
					</div>
				</div>
			</section>
		</div>
	</>
}

export default Calculator;
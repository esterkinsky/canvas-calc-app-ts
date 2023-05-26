import Calculator from '../modules/calc/index';

const useCalc = (refA, refB, refC) => {
	const calc = new Calculator();
	return (operand) => {
		const a = calc.getEntity(refA.current.value);
		const b = calc.getEntity(refB.current.value);
		const c = calc[operand](a, b);
		refC.current.value = c.toString();
	}
}


export default useCalc;
import PolyCalculator from '../modules/polynomial/PolyCalculator';

const usePolyCalc = (refA, refB, refC) => {
	const calc = new PolyCalculator();
	return (operand) => {
		const a = calc.getPolynomial(refA.current.value);
		const b = calc.getPolynomial(refB.current.value);
		const c = calc[operand](a, b);
		console.log(c);
		refC.current.value = c.toString();
	}
}

export default usePolyCalc;
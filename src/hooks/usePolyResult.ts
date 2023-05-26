import Calculator from '../modules/calc';
import PolyCalculator from '../modules/polynomial/PolyCalculator';

const usePolyResult = (refC, refX, refResult) => {
	return () => {
		const x = (new Calculator()).getEntity(refX.current.value);
		const c = (new PolyCalculator()).getPolynomial(refC.current.value);
		refResult.current.value = (c.getValue(x)).toString();
	}
}

export default usePolyResult;
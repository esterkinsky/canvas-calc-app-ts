import { Calculator, Poly } from '..';
import styles from './Calculator.module.css'

const Calculators = () => {
	return (
		<>
			<div className='calcgrid'>
				<div className='c'><Calculator /></div>
				<div className='ci'>
					<div className='dropbtnci'>Ввод матриц, векторов и комплексных чисел</div>
					<div className="dropdowncontentci">
						<a>calc inf</a>
					</div>
				</div>
				<div className='pc'><Poly /></div>
				<div className='pci'>
					<div className='dropbtnpci'>Ввод многочленов</div>
					<div className="dropdowncontentpci">
						<a>poly inf</a>
					</div>
				</div>
			</div></>
	)
}

export default Calculators;
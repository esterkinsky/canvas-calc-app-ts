import FunctionBlock from './FunctionBlock/FunctionBlock';
import './FunctionList.module.css';

interface iFuncListProps {
	list: any,
	delFunc: any
}

const FunctionList: React.FC<iFuncListProps> = ({ list, delFunc }) => {
	return (
		<div className='function-list'>
			{list.map((func:any, index: number | string) => {
				return (
					<div key={index} className='funcsContainer'>
						<FunctionBlock
							func={func}
							delFunc={delFunc}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default FunctionList;

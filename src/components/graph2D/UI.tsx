import { useState, useCallback } from "react";
import Function from '../../modules/graph2D/Function';
import Icons from '../../elements/svg';
import FunctionList from './functionList/FunctionList';
import './Graph2D.css';

interface iUIProps {
	delFunc: any,
	funcsList: any
}

const UI: React.FC<iUIProps> = ({ funcsList, delFunc }) => {

	const [showPanel, setShowPanel] = useState(false);
	const [functionsCount, setFunctionsCount] = useState(0);
	const [deleteFunction, setDeleteFunction] = useState(0);

	const showHidePanelHandler = useCallback((event: React.MouseEvent) => {
		if (event.target != null) {
			(event.target as HTMLInputElement).classList.toggle(`${'down'}`);
			setShowPanel(!showPanel);
		}
	}, [setShowPanel, showPanel]);

	const addFunction = useCallback(() => {
		funcsList[functionsCount] = new Function({ index: functionsCount });
		setFunctionsCount(functionsCount + 1);
	}, [setFunctionsCount, functionsCount, funcsList])

	const deleteFunctionHandler = useCallback((index: number) => {
		delFunc(index);
		setDeleteFunction(deleteFunction + 1);
	}, [delFunc, setDeleteFunction, deleteFunction]);


	return (
		<div className='graph2DUI'>
			{showPanel && <div className='funcsMenu'>
				<button className='addFunction' onClick={addFunction}>Добавить функцию</button>
				<FunctionList
					list={funcsList.filter((func: any) => func)}
					delFunc={deleteFunctionHandler}
				/>
			</div>
			}
			<label>
				<div onClick={showHidePanelHandler}>
					<Icons
						name='arrow'
						color='var(--gray)'
						className='funcsListBtn'
					/></div></label >
		</div>
	)
}

export default UI;
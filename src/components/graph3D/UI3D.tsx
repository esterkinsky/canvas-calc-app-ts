import React, { useCallback, useState } from "react";
import Icons from '../../elements/svg';
import './Graph3D.module.css';

const UI3D = ({
	check,
	addFigure,
	delFigure,
	selectColor,
	LIGHT,
	show,
	powerOfLight,
}) => {

	const [num, setNum] = useState(0);

	const [showPanel, setShowPanel] = useState(false);
	const [showAddList, setShowAddList] = useState(false);

	const showHidePanelHandler = useCallback((event) => {
		event.target.classList.toggle(`${'down'}`);
		setShowPanel(!showPanel);
	}, [setShowPanel, showPanel]);

	const showHideAddListHandler = useCallback(() => {
		setShowAddList(!showAddList);
		
	}, [setShowAddList, showAddList]);

	const addFigureHandler = (event) => {
		const figure = event.target.dataset.figure;
		addFigure(figure, num);

		document.querySelector('.figuresContainer').appendChild(createSettings(figure));
		showHideAddListHandler();
		setNum(num + 1);
	};

	const createSettings = () => {
		const settingsBlock = document.createElement('div');
		settingsBlock.dataset.num = num;

		const button = document.createElement('div');
		button.innerHTML = '&#10006';
		button.dataset.num = num;
		button.addEventListener('click', () => {
			document.querySelector('.figuresContainer').removeChild(settingsBlock);
			delFigure(button.dataset.num);
		});
		button.className = 'deleteFunc';
		settingsBlock.appendChild(button);
		return settingsBlock;
	}

	const switchHandler = (event) => {
		event.target.classList.toggle('switchOn');
	}

	return <>
		{showPanel && <div className='figuresMenu'>
			<div className='allows'>
				<div>
					<input id="colorSelector" type="color" defaultValue="#ebebeb" onChange={() => selectColor()} />
				</div>
				<label>
					<div type="checkbox" id="isPoints" className={`switchBtn ${show.isPointsAllow ? 'switchOn' : ''} `} onClick={(event) => { check('isPointsAllow'); switchHandler(event) }} />
					<span className="checkingButtonStyle">Points</span>
				</label>
				<label>
					<div type="checkbox" id="isEdges" className={`switchBtn ${show.isEdgesAllow ? 'switchOn' : ''} `} onClick={(event) => { check('isEdgesAllow'); switchHandler(event) }} />
					<span className="checkingButtonStyle">Edges</span>
				</label>
				<label>
					<div type="checkbox" id="isPoly" className={`switchBtn ${show.isPolysAllow ? 'switchOn' : ''} `} onClick={(event) => { check('isPolysAllow'); switchHandler(event) }} />
					<span className="checkingButtonStyle">Polygons</span>
				</label>
				<label>
					<div type="checkbox" id="isAnimation" className={`switchBtn ${show.isAnimationAllow ? 'switchOn' : ''} `} onClick={(event) => { check('isAnimationAllow'); switchHandler(event) }} />
					<span className="checkingButtonStyle">Animation</span>
				</label>
				<label>
					<div type="checkbox" id="isShadow" className={`switchBtn ${show.isShadowsAllow ? 'switchOn' : ''} `} onClick={(event) => { check('isShadowsAllow'); switchHandler(event) }} />
					<span className="checkingButtonStyle">Shadows</span>
				</label>
				<div className="powerOfLight">
					<input id="powerOfLight" type="range" min="5000" defaultValue={LIGHT.lumen} max="50000" step="1000" onInput={() => powerOfLight()} />
				</div>
			</div>
			<div className="addButton">
				{showAddList ? <div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cube">Куб</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Sphere" >Сфера</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cone" >Конус</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Ellipsoid" >Эллипсоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cylinder" >Цилиндр</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="EllipticParaboloid">Эллиптический параболоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="HyperbolicCylinder">Гиперболический цилиндр</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="HyperbolicParaboloid">Гиперболический параболоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="ParabolicCylinder">Эллиптический цилиндр</div>
				</div> :
					<button onClick={showHideAddListHandler} className='addFig'>Добавить</button>
				}
				<div className="figuresContainer"></div>
			</div>
		</div>}
		<label>
			<div onClick={showHidePanelHandler}>
				<Icons
					name='arrow'
					color='var(--gray)'
					className='figListBtn'
				/></div></label >
	</>
};

export default UI3D;
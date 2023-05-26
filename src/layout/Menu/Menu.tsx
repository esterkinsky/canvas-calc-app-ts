import React from 'react';
import { ePages } from '../../App';
import { Button } from '../../elements';
import './Menu.css';

interface iMenuProps {
	showComponent: Function;
}

const Menu: React.FC<iMenuProps> = ({ showComponent }) => {
	return <>
		<div className='menu'>
			<Button appearance='primary' className='menuitem' onClick={() => { showComponent(ePages.calculator) }}
			>Calculator</Button>
			<Button appearance='primary' className='menuitem' onClick={() => { showComponent(ePages.graph2D) }}
			>Graph2d</Button>
			<Button appearance='primary' className='menuitem' onClick={() => { showComponent(ePages.graph3D) }}
			>Graph3d</Button>
		</div>
	</>
};
export default Menu;


import React from 'react';
import IconsSVG from './icons.svg';

interface iIconsProps {
	name:string, 
	color:string, 
	className:string
}

const Icons: React.FC<iIconsProps> = ({ name, color, className }) => {

	return (
		<svg className={`icon icon-${name} ${className}`} fill={color} >
			<use xlinkHref={`${IconsSVG}#icon-${name}`} />
		</svg>
	)
}

export default Icons;
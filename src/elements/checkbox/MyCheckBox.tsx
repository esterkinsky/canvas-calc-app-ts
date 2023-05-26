import React, { MouseEventHandler } from 'react';
import './MyCheckBox.module.css'

interface iMyCheckBoxProps {
	text: string,
	onClick: any,
	checked: any
}

const MyCheckBox: React.FC<iMyCheckBoxProps> = ({ text, onClick, checked }) => {
	const id = `checkbox-${Math.round(Math.random() * 9999999)}`;

	return (<>
		<input
			type='checkbox'
			defaultChecked={checked}
			onClick={(event) => onClick((event.target as HTMLInputElement).checked)}
			id={id}
		></input>
		<label htmlFor={id}>{text}</label>
	</>)
}

export default MyCheckBox;
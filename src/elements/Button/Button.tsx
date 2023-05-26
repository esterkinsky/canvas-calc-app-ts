import './Button.css';
import { ButtonProps } from './Button.props';
import Icons from '../svg';
import cn from 'classnames';

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn('button', {
				['primary']: appearance == 'primary',
				['ghost']: appearance == 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow != 'none' && <span className={cn('arrow', {
				['down']: arrow == 'down'
			})}>
				{<Icons name='arrow'
					color='var(--gray)'
					className='' />}
			</span>}
		</button>
	);
};
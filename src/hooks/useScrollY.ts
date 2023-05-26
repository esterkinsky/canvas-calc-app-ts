import { useEffect, useState } from 'react';

const useScrollY = () => {
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		setScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return scrollY;
};

export default useScrollY;
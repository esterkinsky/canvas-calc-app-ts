import { useState } from 'react';
import Menu from './layout/Menu/Menu';
import { Calculators, Graph2D, Graph3D } from './components';

export enum ePages {
	calculator,
	graph2D,
	graph3D,
}

function App() {
	const [showComponent, setshowComponent] = useState<ePages>(ePages.graph2D);

	return (
		<><div className='menu'></div>
			<Menu showComponent={setshowComponent} />
			{showComponent === ePages.graph2D ?
				<Graph2D /> :
				showComponent === ePages.graph3D ?
					<Graph3D /> :
					showComponent === ePages.calculator ?
						<Calculators />
						:
						<>default</>}
		</>
	);
}

export default App;

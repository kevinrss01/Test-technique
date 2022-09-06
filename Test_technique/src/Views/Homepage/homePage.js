import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/homePage.css';

const HomepageContainer = () => {
	const [youShouldNotPass, setYouShouldNotPass] = useState('NOPE');
	const [tryAgain, setTryAgain] = useState(false);

	let navigate = useNavigate();

	const mellon = () => {
		if (youShouldNotPass === 'NOPE') {
			setTryAgain(true);
			setYouShouldNotPass('YES');
		} else {
			navigate('/login');
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					alignSelf: 'center',
					justifyContent: 'center',
					textAlign: 'center',
				}}
			>
				<div style={{ marginBottom: 70, fontSize: 30, color: 'white' }}>
					Test technique alternant Flying For You
				</div>
				<button
					style={{
						backgroundColor: '#60EED2',
						border: 'none',
						padding: '10px 30px',
						borderRadius: 20,
						cursor: 'pointer',
					}}
					onClick={mellon}
				>
					{tryAgain ? 'Connecte moi !(login)' : 'Commencer le test'}
				</button>
				{tryAgain && (
					<div className="text">
						Tu ne pensais pas que ce serait si simple ? ...
					</div>
				)}
			</div>
		</div>
	);
};

export default HomepageContainer;

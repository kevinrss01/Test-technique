import React from 'react';
import { BiMoviePlay } from 'react-icons/bi';
import homeflix from 'img/HomeFlix.png';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	let navigate = useNavigate();
	return (
		<div className="navBar">
			<div className="navBarListMovies">
				<h1>LISTE DES FILMS</h1>
				<BiMoviePlay className="iconMovie" />
			</div>
			<img
				onClick={() => {
					navigate('/movies-list');
				}}
				src={homeflix}
				alt=""
			></img>

			<div
				className="logout"
				onClick={() => {
					navigate('/login');
				}}
			>
				<FiLogOut className="iconLogout" />
				<h2>Se déconnecter</h2>
			</div>
		</div>
	);
}

export default Navbar;

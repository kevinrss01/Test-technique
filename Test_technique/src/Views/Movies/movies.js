import figmaOrNotFigma from '../../img/Figma c mieux.png';
import Data from 'Models/list-de-films';
import '../CSS/homePageMovies.css';
import { BiMoviePlay } from 'react-icons/bi';
import { BsFilterSquareFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import React, { useEffect, useState, useContext } from 'react';
import homeflix from 'img/HomeFlix.png';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiFillCheckSquare } from 'react-icons/ai';
import { ImCheckboxUnchecked } from 'react-icons/im';

const MoviesList = () => {
	const [moviesList, setMoviesList] = useState([]);
	const [showBigCard, setShowBigCard] = useState(false);
	const [movieId, setMovieId] = useState('');

	useEffect(() => {
		setMoviesList(Data);
		console.log(moviesList);
	});

	const getMovieId = (id) => {
		setMovieId(id);
	};

	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};
	return (
		<div id="bodyMoviesList">
			<div className="navBar">
				<div className="navBarListMovies">
					<h1>LISTE DES FILMS</h1>
					<BiMoviePlay className="iconMovie" />
				</div>
				<img src={homeflix}></img>
			</div>

			<div className="moviesList">
				<div id="bodyMoviesList">
					<div className="navBar">
						<div className="navBarListMovies">
							<h1>LISTE DES FILMS</h1>
							<BiMoviePlay className="iconMovie" />
						</div>
						<img src={homeflix}></img>
						<div className="navBarFilters">
							<BsFilterSquareFill className="iconFilters" />
						</div>
						<div className="filtre">
							<div>
								<h2>
									FILTRES <BsFilterSquareFill className="iconFilters" />
								</h2>
							</div>
							<span>Notes : </span>
							<input
								type="checkbox"
								checked={checked}
								onChange={handleChange}
								className="checkbox1"
							/>
							<div className="checkbox">
								<span>5 et plus</span>
								{checked ? (
									<AiFillCheckSquare
										className="iconCheck"
										onClick={handleChange}
									/>
								) : (
									<ImCheckboxUnchecked
										className="uncheckBox"
										onClick={handleChange}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				{moviesList.map((value, key) => {
					return (
						<div
							className="moviesListContainer"
							id={checked && value.vote_average <= 5 ? 'movieCardNone' : ''}
						>
							{showBigCard && movieId === value.id ? (
								<div
									className="bigMovieCard"
									style={{
										backgroundImage: `url(${value.poster_path})`,
										backgroundSize: 'cover',
									}}
								>
									<h1 className="titleBigCard">{value.title}</h1>
									<AiOutlineArrowLeft
										className="arrow"
										onClick={() => {
											setShowBigCard(false);
										}}
									/>
									<div class="containerInfos">
										<div class="info">
											<div className="rating">
												<AiFillStar className="starIcon2" />
												<span>
													{value.vote_average}/10 ({value.vote_count} votes)
												</span>
												-
												<span>
													popularité : {Math.round(value.popularity)}%
												</span>
											</div>
											<div className="dateAndLanguage">
												<span className="date">
													{value.release_date} ({value.original_language})
												</span>
											</div>
										</div>
										<div class="description">
											<p>{value.overview}</p>
										</div>
									</div>
								</div>
							) : (
								<></>
							)}

							<div
								key={key}
								className={showBigCard ? 'movieCard2' : 'movieCard'}
								style={{
									backgroundImage: `url(${value.poster_path})`,
									backgroundSize: 'cover',
								}}
								onClick={() => {
									getMovieId(value.id);
									setShowBigCard(true);
								}}
							>
								<h1 className="title">{value.title}</h1>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MoviesList;

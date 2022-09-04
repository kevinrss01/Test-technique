import figmaOrNotFigma from '../../img/Figma c mieux.png';
import Data from 'Models/list-de-films';
import '../CSS/homePageMovies.css';
import { BiMoviePlay } from 'react-icons/bi';
import { BsFilterSquareFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiFillCheckSquare } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { AiTwotoneLike } from 'react-icons/ai';
import React, { useEffect, useState, useContext, use } from 'react';
import homeflix from 'img/HomeFlix.png';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addId, deleteId } from 'features/like';

const MoviesList = () => {
	const [moviesList, setMoviesList] = useState([]);
	const [showBigCard, setShowBigCard] = useState(false);
	const [movieId, setMovieId] = useState('');
	const [listOfIdMovie, setlistOfIdMovie] = useState([]);
	const [checked, setChecked] = useState(false);
	const [checked2, setChecked2] = useState(false);

	let navigate = useNavigate();
	const movieInfo = useSelector((state) =>
		state.movie.map((val) => val.idMovie)
	); //to get data
	const dispatch = useDispatch();

	useEffect(() => {
		setMoviesList(Data);
		console.log(moviesList);
		setlistOfIdMovie(movieInfo.map((value) => value.idMovie));
	}, []);

	console.log(movieInfo);

	const getMovieId = (id) => {
		setMovieId(id);
	};

	// let checkId = (id) => {
	// 	movieInfo.find((t) => t.idMovie === id);
	// };

	const handleChange = () => {
		setChecked(!checked);
	};

	const handleChange2 = () => {
		setChecked2(!checked2);
	};
	return (
		<div id="bodyMoviesList">
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
				></img>
			</div>

			<div className="filtre flex_center">
				<h2>
					FILTRES <BsFilterSquareFill className="iconFilters" />
				</h2>

				<input
					type="checkbox"
					checked={checked}
					onChange={handleChange}
					className="checkbox1"
				/>
				<div className="checkbox flex_center">
					<span className="flex_center">
						5 <AiFillStar className="starIconFilter" /> et plus
					</span>
					{checked ? (
						<AiFillCheckSquare className="iconCheck" onClick={handleChange} />
					) : (
						<ImCheckboxUnchecked
							className="uncheckBox"
							onClick={handleChange}
						/>
					)}

					<span className="flex_center">Films aimé</span>
					{checked2 ? (
						<AiFillCheckSquare className="iconCheck" onClick={handleChange2} />
					) : (
						<ImCheckboxUnchecked
							className="uncheckBox"
							onClick={handleChange2}
						/>
					)}
				</div>
			</div>

			<div className="moviesList">
				{moviesList.map((value, key) => {
					return (
						<div
							className="moviesListContainer"
							id={
								(checked && value.vote_average <= 5) ||
								(checked2 && !movieInfo.includes(value.id))
									? 'movieCardNone'
									: ''
							}
						>
							{showBigCard && movieId === value.id ? (
								<div
									className="bigMovieCard"
									style={{
										backgroundImage: `url(${value.poster_path})`,
										backgroundSize: 'cover',
									}}
								>
									<div className="containerHeaderBigCard">
										<AiOutlineArrowLeft
											className="arrow"
											onClick={() => {
												setShowBigCard(false);
											}}
										/>
										<h1 className="titleBigCard">{value.title}</h1>

										<div className="likeAndDislike">
											{movieInfo.includes(value.id) ? (
												<AiTwotoneLike
													className="unlike"
													onClick={() => {
														dispatch(deleteId(value.id));
													}}
												/>
											) : (
												<AiOutlineLike
													className="like"
													onClick={() => {
														dispatch(addId(value.id));
													}}
												/>
											)}
										</div>
									</div>

									<div className="containerInfos">
										<div className="info">
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
										<div className="description">
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

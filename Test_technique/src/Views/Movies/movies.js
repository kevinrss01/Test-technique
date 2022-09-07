import Data from 'Models/list-de-films';
import '../CSS/homePageMovies.css';
import { BsFilterSquareFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiFillCheckSquare } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { AiTwotoneLike } from 'react-icons/ai';
import { ImSad } from 'react-icons/im';
import React, { useEffect, useState } from 'react';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addId, deleteId } from 'reduxJS';
import Navbar from './navbar';

const MoviesList = () => {
	const [moviesList, setMoviesList] = useState([]);
	const [showBigCard, setShowBigCard] = useState(false);
	const [movieId, setMovieId] = useState('');
	const [checked, setChecked] = useState(false);
	const [checked2, setChecked2] = useState(false);
	const [cardIsHover, setCardIsHover] = useState(false);
	const dispatch = useDispatch();

	const movieInfo = useSelector((state) =>
		state.movie.map((val) => val.idMovie)
	); //to get data

	useEffect(() => {
		setMoviesList(Data);
	}, [moviesList]);

	const getMovieId = (id) => {
		setMovieId(id);
	};

	const handleChange = () => {
		setChecked(!checked);
	};

	const handleChange2 = () => {
		setChecked2(!checked2);
	};

	return (
		<div id="bodyMoviesList">
			<Navbar />

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
					<span className="flex_center" onClick={handleChange}>
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

					<span className="flex_center" onClick={handleChange2}>
						Films aimé
					</span>
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
			{checked2 && movieInfo.length === 1 ? (
				<span className="noFilm">
					Vous n'avez aimé aucun film <ImSad />
				</span>
			) : (
				<></>
			)}

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
								id={cardIsHover && movieId !== value.id ? 'opacity8' : ''}
								style={{
									backgroundImage: `url(${value.poster_path})`,
									backgroundSize: 'cover',
								}}
								onClick={() => {
									getMovieId(value.id);
									setShowBigCard(true);
								}}
								onMouseEnter={() => {
									if (!showBigCard) {
										setCardIsHover(true);
										getMovieId(value.id);
									}
								}}
								onMouseLeave={() => setCardIsHover(false)}
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

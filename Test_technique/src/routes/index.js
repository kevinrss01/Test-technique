import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Views/Login/login';
import Movies from '../Views/Movies/movies';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="login" element={<Login />} />
			<Route path="movies-list" element={<Movies />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</BrowserRouter>
);

export default Router;

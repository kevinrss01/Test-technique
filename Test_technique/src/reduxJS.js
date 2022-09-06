import { configureStore, createSlice } from '@reduxjs/toolkit';

// const initialValue = { idMovie: [] };

export const movieSlice = createSlice({
	name: 'movie',
	initialState: [{ idMovie: 1 }],
	reducers: {
		addId: (state, action) => {
			const newId = {
				idMovie: action.payload,
			};
			state.push(newId);
		},
		deleteId: (state, action) => {
			state = state.filter((t) => t.idMovie !== action.payload);
			return state;
		},
	},
});

export const store = configureStore({
	reducer: {
		movie: movieSlice.reducer,
	},
});

export const { addId, deleteId } = movieSlice.actions;

export const { likedMovie } = movieSlice.actions;

export default movieSlice.reducer;

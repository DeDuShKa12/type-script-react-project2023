import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {genreService} from "../../services";
import {IDetGenres, IMovies, IMoviesRes,} from "../../interfaces";

interface IState {
    genres: IDetGenres[];
    movieByGenres: IMoviesRes[];
    errors: null | string | unknown;
    totalPages: number;
}

const initialState: IState = {
    genres: [],
    movieByGenres: [],
    errors: null,
    totalPages: 0,
};

const getAll = createAsyncThunk<IDetGenres[], void>(
    "genreSlice/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll();
            return data.genres;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getMoviesByGenre = createAsyncThunk<IMovies, { id: string|undefined; page: string|null }>(
    "genresSlice/getMoviesByGenre",
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getByGenreId(id, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    });

const genresSlice = createSlice({
    name: "genreSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.movieByGenres = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(getMoviesByGenre.rejected, (state, action) => {
                state.errors = action.payload;
            }),
});

const {reducer: genreReducer} = genresSlice;

const genresActions = {
    getAll,
    getMoviesByGenre,
};

export {genresActions, genreReducer};


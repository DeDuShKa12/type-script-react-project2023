import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { filmsService } from "../../services";
import { IConfigSearch, IDetails, IMovies, IMoviesRes } from "../../interfaces";

interface IState {
    films: IMoviesRes[];
    searchFilms: IMoviesRes[];
    selectedQuery: { name: string }
    errors: null | string | unknown;
    totalPages: number;
    filmDetails: IDetails | null

}

const initialState: IState = {
    films: [],
    searchFilms: [],
    selectedQuery: { name: '' },
    errors: null,
    totalPages: 1,
    filmDetails: null
};


const getAll = createAsyncThunk<IMovies, { page: string }>(
    "filmSlice/getAll",
    async ({ page }, { rejectWithValue }) => {
        try {
            const { data } = await filmsService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data);
        }
    }
);

const getById = createAsyncThunk<IDetails, { id: string | undefined }>(
    'filmSlice/getById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await filmsService.getByID(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);



const search = createAsyncThunk<IMovies, { page: string | null, query: { name: string } }>(
    'filmSlice/search',
    async (params, thunkAPI) => {
        try {
            const config: IConfigSearch = {
                page: params.page,
                query: params.query.name
            };
            const { data } = await filmsService.searchByQuery(config);

            return data
        } catch (e) {
            const err = e as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);




const filmSlice = createSlice({
    name: 'filmSlice',
    initialState,
    reducers: {
        setSelectedQuery: (state, action) => {
            state.selectedQuery = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.films = action.payload.results
                state.totalPages = action.payload.total_pages
            })
            .addCase(getAll.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.filmDetails = action.payload
            })
            .addCase(getById.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(search.fulfilled, (state, action) => {
                state.searchFilms = action.payload.results
                state.totalPages = action.payload.total_pages
            })
            .addCase(search.rejected, (state, action) => {
                state.errors = action.payload
            })
});

const { reducer: filmReducer, actions: { setSelectedQuery } } = filmSlice


const filmActions = {
    getAll,
    getById,
    search,
    setSelectedQuery,
}

export {
    filmReducer,
    filmActions
}
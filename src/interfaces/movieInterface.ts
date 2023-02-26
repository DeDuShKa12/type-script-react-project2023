import {ReactNode} from 'react';


export interface IMovies {
    page: number | string
    results: IMoviesRes[]
    total_pages: number
    total_results: number
}

export interface IMoviesRes {
    adult: boolean
    backdrop_path: string
    genre_ids: number[],
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: Date | string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}


export interface IConfigSearch {
    page: string | null;
    query: string;
}

export interface IDetails {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    } | null,
    budget: number
    genres: IDetGenres[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IDetProdComp[]
    production_countries: IDetProdCountry[]
    release_date: ReactNode | string
    revenue: number
    runtime: number
    spoken_languages: IDetLang
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IDetProdComp {
    id: number
    logo_path: null,
    name: string
    origin_country: string
}

export interface IDetProdCountry {
    iso_3166_1: string
    name: string
}

export interface IDetLang {
    english_name: string
    iso_639_1: string
    name: string
}

export interface IDetGenres {
    id: number
    name: string | any
}

export interface IGenre {
    genres: IDetGenres[]
}

export interface IDetGenres {
    id: number
    name: string | any
}

export interface IProdComp {
    id: number,
    logo_path: null | string
    name: string
    origin_country: string
}

export interface ICountrie {
    iso_3166_1: string;
    name: string;
}
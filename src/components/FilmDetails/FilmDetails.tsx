import React, {FC, useEffect} from 'react';
import {Rating} from "@mui/material";
import {useParams} from "react-router-dom";

import {filmActions} from "../../redux/slices/filmSlice";
import css from './FilmDetails.module.css'
import {GenreInDetails} from "../GenreInDetails/GenreInDetails";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {CountriesInDet} from "../CountriesInDet/CountriesInDet";
import {ProductionInDet} from "../ProductionInDet/ProductionInDet";

const FilmDetails:FC = () => {

    const {id} = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    const {filmDetails} = useAppSelector(state => state.filmReducer);



    useEffect(()=>{

        dispatch(filmActions.getById({id}))

    }, [dispatch, id])

    return (
       <>
            {filmDetails &&
                <div className={css.mainBox}>
                    <img className={css.imgBox} src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`} alt={filmDetails.title}/>

                    <div className={css.infoBox}>
                        <h2>{filmDetails.title}</h2>
                        <div className={css.genresDiv}>
                            <b className={css.colorD}>Жанри:</b> {filmDetails.genres.map(genre => <GenreInDetails key={genre.id} genre={genre}/> )}.
                        </div>
                        <div className={css.otherDiv}>
                            <b className={css.colorD}>Популярність:   </b>{filmDetails.popularity}
                        </div>
                        <div className={css.otherDiv}>
                            <b className={css.colorD}> Дата виходу:</b> <p>{filmDetails.release_date}</p>
                        </div>
                        <div className={css.otherDiv}>
                            <b className={css.colorD}>Рейтинг: </b> <Rating name="read-only" value={filmDetails.vote_average} max={10} precision={0.5} readOnly />
                        </div>
                        <div>
                            <b className={css.colorD}>Країна виробник: </b>{filmDetails.production_countries.map((countrie, index) => <CountriesInDet key={index} countrie={countrie}/>)}
                        </div>
                        <div className={css.otherDiv}>
                            <b className={css.colorD}>Статус: </b> {filmDetails.status}
                        </div>
                        <div>
                            <b className={css.colorD}>Компанія виробник: </b> {filmDetails.production_companies.map(prodc=><ProductionInDet key={prodc.id} prodc={prodc}/>)}
                        </div>
                        <h4>{filmDetails.overview}</h4>
                    </div>
                </div>

            }

       </>
    );
};

export {FilmDetails};
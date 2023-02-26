import React, { FC } from 'react';
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

import css from './Film.module.css'
import { IMoviesRes } from "../../interfaces";

interface IProps {
    film: IMoviesRes;

}


const Film: FC<IProps> = ({ film }) => {

    const { title, poster_path, vote_average, id } = film

    const navigate = useNavigate();

    return (
        <div className={css.flipCard} onClick={() => navigate(id.toString())}>
            <div className={css.flipCardInner}>
                <div className={css.flipCardFront}>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
                </div>
                <div className={css.flipCardBack}>
                    <div className={css.infoBox}>
                        <h4>{title}</h4>
                        <Rating name="read-only" value={vote_average} max={10} precision={0.5} readOnly className='rating' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Film };
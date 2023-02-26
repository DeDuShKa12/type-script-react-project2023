import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import css from './Genre.module.css'
import {IDetGenres} from "../../interfaces";

interface IProps {
    genre: IDetGenres
}


const Genre:FC<IProps> = ({genre}) => {
    const {id, name} = genre

    const navigate = useNavigate();



    return (
        <button onClick={() => navigate(`/genre/${id}`)} className={css.buttonClose}>{name}</button>

    );
};

export {Genre};
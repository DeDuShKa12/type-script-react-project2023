import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import css from './GenreInDetails.module.css'

interface IProps {
    genre: {id:number,name:string}
}

const GenreInDetails:FC<IProps> = ({genre}) => {
    const {id, name} = genre

    const navigate = useNavigate();

    const goToGenre = ():void => {
        navigate(`/genre/${id}`)
    };

    return (
        <div className={css.box}>
            <button className={css.buttonClose} onClick={() => goToGenre()}>{ name }</button>
        </div>
    );
};

export {GenreInDetails};

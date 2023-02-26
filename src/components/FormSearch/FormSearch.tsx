import {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {BiSearchAlt} from "react-icons/bi";

import {filmActions} from "../../redux/slices/filmSlice";
import css from './FormSearch.module.css'
import {useAppDispatch} from "../../hooks";


const FormSearch:FC = () => {



    const {reset, register, handleSubmit} = useForm<{name:string}>();

    const navigate = useNavigate();

    const dispatch = useAppDispatch()


    const searchMovie = (query:{name:string}):void => {
        dispatch(filmActions.setSelectedQuery(query))
        navigate('search')
        reset()
    };

    return (
        <form className={css.formBox} onSubmit={handleSubmit(searchMovie)}>
            <input type={'text'} placeholder={'Search'} {...register('name')}/>
            <button><BiSearchAlt className={css.biSearch}/></button>
        </form>
    );
};

export {FormSearch};
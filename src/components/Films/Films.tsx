import React, {FC, useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

import { Film } from '../Film/Film';
import { filmActions } from '../../redux/slices/filmSlice';
import css from './Films.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks";

const Films: FC = () => {
    const dispatch = useAppDispatch();

    const { films, totalPages } = useAppSelector((state) => state.filmReducer);

    const [query, setQuery] = useSearchParams();

    let [totPage,setTotPage] = useState<number>(totalPages);

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({ page: '1' });
        }
    }, [setQuery, query])

    useEffect(() => {
        if(totalPages > 500 ) {
            setTotPage(500)
        }
        else if (totalPages<500){
            setTotPage(totalPages)
        }
        dispatch(filmActions.getAll({ page: query.get('page') || '1' }));
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [dispatch, query, totalPages, setTotPage]);


    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {

        setQuery({ page: newPage.toString() });
    };


    return (
        <>
            <div className={css.films}>
                 {films.map((film) => (
                <Film key={film.id} film={film}/>))}
            </div>
            <div className={css.pageDiv}>
                <Pagination
                    count={totPage}
                    page={+query.get('page')!!}
                    onChange={handleChangePage}
                />
            </div>
        </>
    );
};

export { Films };
import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Pagination} from '@mui/material';

import {filmActions} from '../../redux/slices/filmSlice';
import {Film} from '../Film/Film';
import css from './QueryFilms.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";

const QueryFilms: FC = () => {
    const dispatch = useAppDispatch();
    const {searchFilms, selectedQuery, totalPages} = useAppSelector(
        (state) => state.filmReducer);

    let [totPage,setTotPage] = useState<number>(totalPages);

    const [pageQuery, setPageQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        if(totalPages > 500 ) {
            setTotPage(500)
        }
        else if (totalPages<500){
            setTotPage(totalPages)
        }
        dispatch(
            filmActions.search({
                query: selectedQuery,
                page: pageQuery.get('page'),
            })
        )
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [dispatch, pageQuery, selectedQuery, totalPages]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageQuery({page: value.toString()});
    };

    return (
        <>
            <div className={css.filmsBox}>
                {searchFilms.map((film) => (
                    <Film key={film.id} film={film}/>
                ))}
            </div>
            <div className={css.divPages}>
                <Pagination
                    count={totPage}
                    page={+pageQuery.get('page')!!}
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export {QueryFilms};


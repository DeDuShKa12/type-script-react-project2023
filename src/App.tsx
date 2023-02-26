import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { MainLayout } from './layouts';
import { FilmDetailsPage, FilmsPage } from './pages';
import { SearchPage } from './pages';
import { FilmGenresPage } from './pages';

const App: FC = () => {


    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage<string>('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = (): void => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout switchTheme={switchTheme} theme={theme} />}>
                <Route index element={<Navigate to={'films'} />} />
                <Route path={'films'} element={<FilmsPage />} />
                <Route path={'films/:id'} element={<FilmDetailsPage />} />
                <Route path={'genre/:id'} element={<FilmGenresPage />} />
                <Route path={'search'} element={<SearchPage />} />
                <Route path={'search/:id'} element={<FilmDetailsPage />} />
                <Route path={'genre/:id/:id'} element={<FilmDetailsPage />} />
            </Route>
        </Routes>
    );
};

export { App };
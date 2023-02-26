import { Header, Sidebar } from "../components";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import css from './MainLayout.module.css'

export interface MainLayoutProps {
    switchTheme: () => void;
    theme: string;
    children?: ReactNode;
}


const MainLayout: FC<MainLayoutProps> = ({ switchTheme, theme }) => {
    return (
        <div>
            <Header switchTheme={switchTheme} theme={theme} />
            <Sidebar />
            <div className={css.MainBox}>
                <div className={css.filmsBox}>
                    <Outlet />

                </div>
            </div>
        </div>
    );
};

export { MainLayout };
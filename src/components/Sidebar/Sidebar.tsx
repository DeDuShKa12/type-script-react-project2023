import React, {FC, useMemo, useState} from 'react';
import { Genres } from '../Genres/Genres';

import './Sidebar.css';


const Sidebar:FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sidebarClasses = useMemo(() => isOpen ? 'sidebar-content open' : 'sidebar-content', [isOpen]);
    const triggerClasses = useMemo(() => isOpen ? 'sidebar-trigger open' : 'sidebar-trigger', [isOpen]);

    const toggleSidebar = (): void => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = (): void => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={triggerClasses} onClick={toggleSidebar}>
                <button className={'buttonClose'}>Жанри</button>
            </div>
            <div className={sidebarClasses}>
                <div>
                    <button className={'buttonClose'} onClick={closeSidebar}>
                        Закрити
                    </button>
                </div>
                <div className={'genreBox'}>
                    <Genres />
                </div>
            </div>
        </>
    );
};

export { Sidebar };
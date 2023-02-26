import React, {FC} from 'react';
import {ICountrie} from "../../interfaces";

interface IProps {
    key:number;
    countrie: ICountrie
}

const CountriesInDet:FC<IProps> = ({countrie}) => {

    const {name}= countrie

    return (
        <div>
            {name}
        </div>
    );
};

export {CountriesInDet};
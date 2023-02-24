import React, {FC} from 'react';
import {IProdComp} from "../../interfaces";

interface IProps {
    key:number;
    prodc: IProdComp;
}



const ProductionInDet:FC<IProps> = ({prodc}) => {
    const {name}=prodc
    return (
        <div>
            {name}
        </div>
    );
};

export {ProductionInDet};
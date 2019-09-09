import React, { useContext }  from 'react';
import './Filter.scss';


import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";




const Filter = observer((props) => {
       
    const store = useContext(StoreContext).AppStore;
    const options = store.aPoolOfCountries.map(option => {
        return (
            <option value={option.country}>{option.country}</option>
        )
    })
    return (
        <div className="Filter">
        <select>
            {options}
        </select>
    </div>
    )
});

export default Filter;

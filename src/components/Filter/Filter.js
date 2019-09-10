import React, { useContext }  from 'react';
import './Filter.scss';


import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";




const Filter = observer((props) => {

       
    const store = useContext(StoreContext).AppStore;

    const options = [];

    for(let i = 0; i < store.aPoolOfCountries.length; i++) {
        options.push(store.aPoolOfCountries[i].country);
    }
    options.sort();
    options.unshift("Pool A", "Pool B", "Pool C", "Pool D");
    return (
        <div className="Filter">
            {store.filterValue === '' ? <img id="filter-logo" src="/images/filter.png" /> : <img onClick={store.clearFilterData} id="remove-filter-logo" src="/images/redcross.png" />}
            <select id="filter-select" value={store.filterValue} onChange={(value) => store.changeFilterValue(value.target.value)}>
                 <option value="" disabled selected>Filter:</option>
                {options.map(option => <option value={option}>{option}</option>)}
            </select>
        </div>
    )
    // return (
    //     <></>
    // )
});

export default Filter;

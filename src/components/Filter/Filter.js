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
    const stylishSelect = store.filterValue === '' ? "filter-select disabled" : 'filter-select';
    const addRedCrossIcon = store.filterValue === '' ? "Filter" : "Filter filtered"
    return (
        <div className={addRedCrossIcon}>
            
            {/* <img className="drop-down-arrow"src="/images/drop-down-arrow.svg" /> */}
            <select className={stylishSelect} value={store.filterValue} onChange={(value) => store.changeFilterValue(value.target.value)}>
                 <option value="" disabled selected>Filter </option>
                 
                {options.map(option => <option value={option}>{option}</option>)}
                
            </select>
        </div>
    )
    // return (
    //     <></>
    // )
});

export default Filter;

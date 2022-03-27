import React from 'react';
import '../styles/SearchBar.css';

function SearchBar({placeholder, data}) {
    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder={placeholder}/>
            </div>
            <div className='dataResult'></div>
        </div> 
    )
}

export default SearchBar
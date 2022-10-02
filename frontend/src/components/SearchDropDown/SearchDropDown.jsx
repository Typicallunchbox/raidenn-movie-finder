import React from 'react'
import './SearchDropDown.scss'

const SearchDropDown = () => {
  return (
    <>
     <div className='search-dropdown'>
        <div className='filters'>
          <div className='general-tags'>
            {/* Most Popular */}
            {/* Most Recent */}
            {/* Best Rating */}
            <button>Most Popular</button>
            <button>Most Recent</button>
            <button>Best Rating</button>
          </div>
          <div className='date-range'>
            {/* Input field */}
          </div>
          <div className='genre'>
            {/* Dropdown where user can select a genre */}
          </div>
        </div>
        <div className='buttons'>
          <button className='button bg-green-400 hover:bg-slate-500'>Search</button>
        </div>
     </div>
    </>
  )
}

export default SearchDropDown
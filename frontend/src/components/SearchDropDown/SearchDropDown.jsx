import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaAngleUp } from "react-icons/fa";
import { addTag } from '../../features/movies/movieSlice';




import './SearchDropDown.scss';



const SearchDropDown = () => {
const dispatch = useDispatch()
const {movies, tag} = useSelector((state) => state.movies) 

const setTagState = (selectedTag) => {
  dispatch(addTag('popular'))

}
  
  return (
    <>
     <div className='search-dropdown'>
      <div className='container'>
      <div className='filters'>
          <div className='general-tags'>
            {/* Most Popular */}
            {/* Most Recent */}
            {/* Best Rating */}
            <button onClick={setTagState('popular')}>Most Popular</button>
            <button>Most Recent</button>
            <button>Best Rating</button>
          </div>
          <div className='flex'>
          <div className='date-range'>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
              <InputLabel>Released Year</InputLabel>
                <Select

                  // value={age}
                  label="Released Year"
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className='genre'>
            <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel>Genre</InputLabel>
              <Select

                // value={age}
                label="Genre"
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Action'}>Action</MenuItem>
                <MenuItem value={'Comedy'}>Comedy</MenuItem>
                <MenuItem value={'Drama'}>Drama</MenuItem>
                <MenuItem value={'Romance'}>Romance</MenuItem>
                <MenuItem value={'Scifi'}>Scifi</MenuItem>
                <MenuItem value={'Thriller'}>Thriller</MenuItem>
                <MenuItem value={'Horror'}>Horror</MenuItem>
                <MenuItem value={'Mystery'}>Mystery</MenuItem>
                <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                <MenuItem value={'Documentary'}>Documentary</MenuItem>
              </Select>
            </FormControl>
          </div>
          </div>
          <input type="text" id="comment" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Search for a movie..." required></input>
        </div>
        <div className='buttons'>
          <button className='button bg-green-400 hover:bg-slate-500'>Search</button>
        </div>
        
      </div>
      <div className='collapse-button w-full mt-2 p-1 bg-stone-300 hover:bg-stone-400'>
          <FaAngleUp className='m-auto' />
        </div>
     </div>
    </>
  )
}

export default SearchDropDown
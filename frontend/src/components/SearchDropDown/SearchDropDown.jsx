import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaAngleUp } from "react-icons/fa";
import { addTag } from '../../features/movies/movieSlice';




import './SearchDropDown.scss';



const SearchDropDown = (props) => {
const [showFilters, setshowFilters] = useState(false);
const dispatch = useDispatch()
const {movies, tag} = useSelector((state) => state.movies) 

const setTagState = (selectedTag) => {
  dispatch(addTag(selectedTag))
}

useEffect(() => {
  if(props.openSearch){
    setshowFilters(true);
  }

}, [props.openSearch])


const collapse = () => {
  setshowFilters(!showFilters);
}
  
  return (
    <>
     <div className={`search-dropdown ${!showFilters ? 'collapse' : ''}`}>
      {showFilters &&
      <div className='container'>
      <div className='filters'>
          <div className='general-tags'>
            <button onClick={() => {setTagState('popular')}}>Most Popular</button>
            <button onClick={() => {setTagState('upcoming')}}>Upcoming</button>
            <button onClick={() => {setTagState('top_rated')}}>Best Rating</button>
          </div>
          <div className='flex'>
          <div className='date-range'>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
              <InputLabel>Released Year</InputLabel>
                <Select

                  value={''}
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

                value={''}
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
          <div className='flex'>
            <input type="text" id="comment" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Search for a movie..." required></input>
            <button className='button bg-green-400 hover:bg-slate-500'>Search</button>
          </div>
        </div>

        
      </div>}
      <div onClick={() => {collapse()}} className='collapse-button w-full mt-2 p-1 bg-stone-300 hover:bg-stone-400 rounded'>
          <div><FaAngleUp className='m-auto' /></div>
        </div>
     </div>
    </>
  )
}

export default SearchDropDown
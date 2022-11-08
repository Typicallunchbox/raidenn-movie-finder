import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaAngleUp } from "react-icons/fa";
import { addTag, addMovies } from '../../features/movies/movieSlice';
import axios from "axios";




import './SearchDropDown.scss';



const SearchDropDown = (props) => {
const [showFilters, setshowFilters] = useState(false);
const [searchText, setSearchText] = useState('');
const [dropDownClass, setDropDownClass] = useState('');
const dispatch = useDispatch()
const {movies, tag} = useSelector((state) => state.movies) 

const setTagState = (selectedTag) => {
  dispatch(addTag(selectedTag))
}
let scrollLocation = null;
useEffect(() => {
  if(window != undefined){
    window.addEventListener("scroll", (event) => {
      scrollLocation = Math.round(window.scrollY * 100) / 100
      // console.log(scrollLocation)

      if(scrollLocation > 50){
        if(dropDownClass !== 'search-dropdown-full'){
          setDropDownClass('search-dropdown-full')
        }
      }
      if(dropDownClass < 50){
        setDropDownClass('search-dropdown')
      }
      if(scrollLocation > 1420){
        setshowFilters(false);
      }
      if(!showFilters && scrollLocation < 1420){
        setshowFilters(true);
      }
  });
}
  setDropDownClass('search-dropdown')
  if(props.openSearch){
    setshowFilters(true);
  }else{
    setshowFilters(false);
  }

}, [props.openSearch])


const collapse = () => {
  setshowFilters(!showFilters);
}

const search = () => {
  if(searchText.trim() != ''){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${searchText}&language=en-US&page=1`)
    .then((resp) => {
      dispatch(addMovies(resp.data.results))
    });
  }
}

  return (
    <>
     {showFilters && window.location.origin+'/' == window.location.href && <div className={dropDownClass}>
      {showFilters &&
      <div className='container'>
      <div className='filters'>
          <div className='general-tags'>
            <button className='secondary-bg-colour' onClick={() => {setTagState('popular')}}>Most Popular</button>
            <button className='secondary-bg-colour' onClick={() => {setTagState('upcoming')}}>Upcoming</button>
            <button className='secondary-bg-colour' onClick={() => {setTagState('top_rated')}}>Best Rating</button>
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
            <input onBlur={(e) => {setSearchText(e.target.value)}} type="text" id="comment" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Search for a movie..." required></input>
            <button onClick={() => {search()}} type='button' className='button bg-green-400 hover:bg-slate-500'>Search</button>
          </div>
        </div>

        
      </div>}
      {/* <div onClick={() => {collapse()}} className='collapse-button w-full mt-2 p-1 bg-stone-300 hover:bg-stone-400 rounded'>
          <div><FaAngleUp className='m-auto' /></div>
        </div> */}
     </div>}
    </>
  )
}

export default SearchDropDown
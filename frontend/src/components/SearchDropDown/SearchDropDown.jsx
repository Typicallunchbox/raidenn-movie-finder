import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addTag, addMovies } from '../../features/movies/movieSlice';
import axios from "axios";
import './SearchDropDown.scss';
import { validYear } from '../../static/regex';
import { DropdownSelect } from "../../components/DropdownSelect/index";




const SearchDropDown = (props) => {
const [showFilters, setshowFilters] = useState(false);
const [releasedYear, setReleasedYear] = useState('');
const [genre, setGenre] = useState('');
const [searchText, setSearchText] = useState('');
const [dropDownClass, setDropDownClass] = useState('');
const genres = ['Action','Comedy','Drama','Romance','Scifi','Thriller','Horror','Mystery','Fantasy','Documentary']
const dispatch = useDispatch()

const setTagState = (selectedTag) => {
  dispatch(addTag(selectedTag))
}
useEffect(() => {
  let scrollLocation = null;

  if(window !== undefined){
    window.addEventListener("scroll", (event) => {
        scrollLocation =  Math.round(window.scrollY * 100) / 100

        if(scrollLocation > 50){
          if(dropDownClass !== 'search-dropdown-full'){
            setDropDownClass('search-dropdown-full')
          }
        }else{
          setDropDownClass('search-dropdown')
        }
        
        return () => window.removeEventListener('scroll');
  });
}
  if(dropDownClass === ''){
    setDropDownClass('search-dropdown')
  }
  if(props.openSearch){
    setshowFilters(true);
  }else{
    setshowFilters(false);
  }

}, [props.openSearch, dropDownClass, showFilters, props])



const search = () => {

  if(releasedYear !== ''){
    let date =  new Date().getFullYear();

    if(!(validYear.test(releasedYear) && parseInt(releasedYear) <= parseInt(date))){
      //Return error msg
      return;
    }
  }

  if(searchText.trim() !== ''){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${searchText}&primary_release_year=${releasedYear}&with_genres=${genre}&language=en-US&page=1`)
    .then((resp) => {
      dispatch(addMovies(resp.data.results))
    });
  }
}

  return (
    <>
      {showFilters && window.location.origin + "/" === window.location.href && (
        <div className={dropDownClass}>
          {showFilters && (
            <div className='px-10 py-4'>
              <div className='filters'>
                <div className='general-tags'>
                  <button
                    className='secondary-bg-colour'
                    onClick={() => {
                      setTagState("popular");
                    }}
                  >
                    Most Popular
                  </button>
                  <button
                    className='secondary-bg-colour'
                    onClick={() => {
                      setTagState("upcoming");
                    }}
                  >
                    Upcoming
                  </button>
                  <button
                    className='secondary-bg-colour'
                    onClick={() => {
                      setTagState("top_rated");
                    }}
                  >
                    Best Rating
                  </button>
                </div>
                <div className='flex gap-2 mb-2'>
                  <div className='date-range w-full'>
                      <input
                        value={releasedYear}
                        onChange={(e) => {
                          setReleasedYear(e.target.value);
                        }}
                        placeholder="Year"
                        id='outlined-basic'
                        label='Released Year'
                      />
                  </div>
                  <div className='genre w-full'>
                      <DropdownSelect
                        onSelect={(value) => setGenre(value)}
                        placeholder='Genre'
                        array={genres}
                      />
                  </div>
                </div>
                <div className='text-right'>
                  <input
                    onBlur={(e) => {
                      setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        search();
                      }
                    }}
                    type='text'
                    id='comment'
                    className='py-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5'
                    placeholder='Search for a movie...'
                    required
                  ></input>
                  <button
                    onKeyDown={(e) => {
                      if (e.code === 'Enter') {
                        search();
                      }
                    }}
                    onClick={() => {search()}}
                    type='button'
                    className='bg-green-500 hover:bg-slate-800 ml-1 px-4 mt-2'>
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <div onClick={() => {collapse()}} className='collapse-button w-full mt-2 p-1 bg-stone-300 hover:bg-stone-400 rounded'>
          <div><FaAngleUp className='m-auto' /></div>
        </div> */}
        </div>
      )}
    </>
  );
}

export default SearchDropDown
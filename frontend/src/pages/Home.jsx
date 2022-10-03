import { React, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


// import axios from "axios";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const { isError, message} = useSelector((state) => state.goals) 
  const { movies , tag} = useSelector((state) => state.movies) 
  
  useEffect(() => {

    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }
  }, [user, navigate, dispatch, isError, message])

  return (
    <div className="container">
      {user &&<div className="catalogue">
        <ItemCatalogueList tag={tag} />
      </div>}
    </div>
  );
};
export default Home
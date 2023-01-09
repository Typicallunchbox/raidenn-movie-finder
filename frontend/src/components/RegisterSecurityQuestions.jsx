import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import {DropdownSelect} from '../components/DropdownSelect/index';
import securityQuestions from '../static/securityQuestions.json'

const RegisterSecurityQuestions = () => {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    let temp = [];
    for (let index = 0; index < securityQuestions.length; index++) {
      const element = securityQuestions[index];
      temp.push(element.question);
    }
    setQuestions(temp);
  }, [])
  
  return (
    <div>
      <div className='login_container '>
        <div className='inner-container'>
          <div className='px-12 pt-6'>
            <h1
              className='bk-text-colour'
              style={{
                fontFamily: "ThunderBoldLC",
                fontSize: "35px",
                letterSpacing: "3px",
              }}
            >
              Security Questions
            </h1>
          <DropdownSelect array={questions} />
          </div>
          <button  type='submit' className='btn-primary'>
            Save
          </button>
          <div className='h-4'></div>
        </div>
      </div>
    </div>
  );
}
export default RegisterSecurityQuestions
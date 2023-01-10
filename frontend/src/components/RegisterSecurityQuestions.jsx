import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import {DropdownSelect} from '../components/DropdownSelect/index';
import securityQuestions from '../static/securityQuestions.json'

const RegisterSecurityQuestions = () => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([
    {
      question: '',
      answer:''
    },
    {
      question: '',
      answer:''
    }
  ])


  useEffect(() => {
    let temp = [];
    for (let index = 0; index < securityQuestions.length; index++) {
      const element = securityQuestions[index];
      temp.push(element.question);
    }
    setQuestions(temp);
  }, [])
  
  const onBlur = (name, value, index) => {
    let tempAnswers = null;
    tempAnswers = {...answers}
    tempAnswers[index][name] = value.toLowerCase();
    setAnswers(tempAnswers);
  };

  return (
        <div>
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
            
            <div className='flex flex-col text-left mb-8'>
              <p className='bk-text-colour pl-2'>Question 1</p>
              <DropdownSelect onSelectLanguage={value => onBlur('question',value,0)} placeholder="Choose a security question" array={questions} />
              <input
                onBlur={(e) => onBlur(e.target.name, e.target.value , 0)}
                className='mt-2'
                id='answer'
                name='answer'
                type='text'
                placeholder='Answer'
              />
            </div>
            <div className='flex flex-col text-left mb-12'>
              <p className='bk-text-colour pl-2'>Question 2</p>
              <DropdownSelect onSelectLanguage={value => onBlur('question',value, 1)}  placeholder="Choose a security question" array={questions} />
              <input
                onBlur={(e) => onBlur(e.target.name, e.target.value , 1)}
                className='mt-2'
                id='answer'
                name='answer'
                type='text'
                placeholder='Answer'
              />
            </div>
          </div>
          <button  type='submit' className='btn-primary'>
            Save
          </button>
          <div className='h-4'></div>
        </div>
  );
}
export default RegisterSecurityQuestions
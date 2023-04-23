import { useState } from "react";
import { getSecurityQuestions, compareSecurityAnswers } from "../features/auth/authSlice";
import { validEmail } from '../static/regex'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [validAnswers, setValidAnswers] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [answers, setAnswers] = useState([
    {
      question: "",
      answer: "",
    },
    {
      question: "",
      answer: "",
    },
  ]);

  const onBlur = (name, value, index) => {
    let tempAnswers = null;
    tempAnswers = [...answers];
    tempAnswers[index][name] = value.toLowerCase();
    setAnswers(tempAnswers);
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    setErrorMsg("");
    if(!validEmail.test(email)){setErrorMsg("Invalid email format"); return}

    let result = await getSecurityQuestions({email});
    if(result.length === 0){setErrorMsg("Confirm this is a registered email"); return}
      
    let tempArray = [...answers];
    tempArray[0].question = result[0];
    tempArray[1].question = result[1];
    setAnswers(tempArray);
    setUserExists(true);
  };

  const onSubmitAnswers = async(e) => {
    e.preventDefault();
    setValidAnswers(false);
    setErrorMsg("");

    let valid = true;
    for (let index = 0; index < answers.length; index++) {
      const element = answers[index];
      if (element.question === "") valid = false;
      if (element.answer === "") valid = false;
    }

    if(valid){
      let compareResult = await compareSecurityAnswers({response:answers, email});
      if(compareResult?.status === 'OK'){
        setValidAnswers(true);
        setTempPassword(compareResult?.temp);
      }
    }
  };

  return (
    <div>
      {!userExists && (<div>
        <div className='px-12 pt-6'>
          <h1
            className='bk-text-colour leading-12 text-[35px] font-thunderBoldLC tracking-[3px]'
          >
            Forgot Password
          </h1>

          <div className='flex flex-col text-left mb-8'>
            <p className='bk-text-colour pl-2'>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='mt-2'
              id='answer'
              name='answer'
              type='text'
              placeholder='Enter your email address'
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit(e);
                }
              }}
            />
            <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p>
          </div>
        </div>
        <button onClick={onSubmit} type='submit' className='btn-primary'>
          Submit
        </button>
        <div className='h-4'></div>
      </div>)}

      {userExists && !validAnswers && (<div>
        <div className='px-12 pt-6'>
          <h1
            className='bk-text-colour mb-0 text-[35px]  font-thunderBoldLC tracking-[3px]'
          >
            Forgot Password
          </h1>
          <h5 className="text-md text-slate-500 mb-6">Security Questions</h5>

          {answers.map((q,index) => (
          <div className='flex flex-col text-left mb-8'>
            <p className='bk-text-colour pl-2'>{q.question}</p>
            <input
            onBlur={(e) => onBlur(e.target.name, e.target.value, index)}
            className='mt-2'
              id='answer'
              name='answer'
              type='text'
              placeholder='Answer'
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onBlur(e.target.name, e.target.value, index)
                  onSubmitAnswers(e);
                }
              }}
            />
            {/* <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p> */}
          </div>
          ))}
        </div>
        <button onClick={onSubmitAnswers} type='submit' className='btn-primary'>
          Submit Answers
        </button>
        <div className='h-4'></div>
      </div>)}
      
      {userExists && validAnswers &&(<div>
        <div className='px-12 pt-6'>
          <h1
            className='bk-text-colour mb-0 text-[35px]  font-thunderBoldLC tracking-[3px]'
          >
            Important Notice
          </h1>
          <h5 className="text-md text-slate-500 mb-6">We have generated a new temporary password for you (Keep it noted). Please login and go to your profile to set your own new Password.</h5>
          <div className='flex flex-col text-center mb-4'>
            <p className='bk-text-colour'>New Temporary Password:</p>
            <p className='text-rose-500'>{tempPassword}</p>
          </div>
        </div>
        <button onClick={() => {window.location.reload(); }} type='submit' className='btn-primary'>
          Return to Login
        </button>
        <div className='h-4'></div>
      </div>)}
      
      
    </div>
  );
};
export default ForgotPassword;

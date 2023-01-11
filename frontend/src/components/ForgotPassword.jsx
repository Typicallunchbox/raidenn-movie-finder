import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DropdownSelect } from "../components/DropdownSelect/index";
import securityQuestions from "../static/securityQuestions.json";
import { getSecurityQuestions, compareSecurityAnswers } from "../features/auth/authSlice";
import { validEmail, validPasswordStrength } from '../static/regex'

const ForgotPassword = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [validAnswers, setValidAnswers] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  useEffect(() => {
    let temp = [];
    for (let index = 0; index < securityQuestions.length; index++) {
      const element = securityQuestions[index];
      temp.push(element.question);
    }
    setQuestions(temp);
  }, []);

  const onBlur = (name, value, index) => {
    let tempAnswers = null;
    tempAnswers = [...answers];
    tempAnswers[index][name] = value.toLowerCase();
    setAnswers(tempAnswers);
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    setErrorMsg("");

    if (validEmail.test(email)) {
      let result = await getSecurityQuestions({email});
      if(result.length > 0){
        let tempArray = null;
        tempArray = [...answers];
        tempArray[0].question = result[0];
        tempArray[1].question = result[1];
        setAnswers(tempArray);
        setUserExists(true);
      }else{
        setErrorMsg("Confirm this is a registered email")
      }

    }else{
      setErrorMsg("Invalid email format")
    }
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
      }
    }
  };

  const savePassword = async(e) => {
    e.preventDefault();
    setErrorMsg("")
    if (!validPasswordStrength.test(password)) {
      setErrorMsg("Password Guide : Uppercase & Lowercase letters, minimum 7 characters, 1 Number & Special character"); 
      return;
    }
    if(password !== confirmPassword){setErrorMsg("Passwords don't match"); return;}
    else{
      //Update Password
      console.log('hit')
    }
  };

  return (
    <div>
      {!userExists && (<div>
        <div className='px-12 pt-6'>
          <h1
            className='bk-text-colour'
            style={{
              fontFamily: "ThunderBoldLC",
              fontSize: "35px",
              letterSpacing: "3px",
            }}
          >
            Forgot Password
          </h1>

          <div className='flex flex-col text-left mb-8'>
            <p className='bk-text-colour pl-2'>Email</p>
            <input
              onBlur={(e) => setEmail(e.target.value)}
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
            className='bk-text-colour mb-0'
            style={{
              fontFamily: "ThunderBoldLC",
              fontSize: "35px",
              letterSpacing: "3px",
            }}
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
            className='bk-text-colour mb-0'
            style={{
              fontFamily: "ThunderBoldLC",
              fontSize: "35px",
              letterSpacing: "3px",
            }}
          >
            New Password
          </h1>
          <h5 className="text-md text-slate-500 mb-6">Set a new secure password</h5>
          <div className='flex flex-col text-left mb-4'>
            <p className='bk-text-colour pl-2'>New Password</p>
            <input
              onBlur={(e) => setPassword(e.target.value)}
              className='mt-2'
              id='password'
              name='password'
              type='password'
              placeholder='Enter your new password'
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  savePassword(e);
                }
              }}
            />
          </div>
          <div className='flex flex-col text-left mb-2'>
            <p className='bk-text-colour pl-2'>Confirm New Password</p>
            <input
              onBlur={(e) => setConfirmPassword(e.target.value)}
              className='mt-2'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm new password'
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  savePassword(e);
                }
              }}
            />
          </div>
          <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p>
        </div>
        <button onClick={savePassword} type='submit' className='btn-primary'>
          Save
        </button>
        <div className='h-4'></div>
      </div>)}
      
      
    </div>
  );
};
export default ForgotPassword;

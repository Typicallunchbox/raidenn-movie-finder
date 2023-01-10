import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DropdownSelect } from "../components/DropdownSelect/index";
import securityQuestions from "../static/securityQuestions.json";
import { getSecurityQuestions } from "../features/auth/authSlice";
import { validEmail } from '../static/regex'

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
    console.log('hit')
    if (validEmail.test(email)) {
      let result = await getSecurityQuestions({email});
      if(result.length > 0){
        let tempArray = null;
        tempArray = [...answers];
        tempArray[0].question = result[0];
        tempArray[1].question = result[1];
        console.log("tempArray:", tempArray)
        setAnswers(tempArray);
      }
    }else{
      setErrorMsg("Invalid email format")
    }
  };

  return (
    <div>
      {!userExists ? (<div>
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
            />
            <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p>
          </div>
        </div>
        <button onClick={onSubmit} type='submit' className='btn-primary'>
          Submit
        </button>
        <div className='h-4'></div>
      </div>)
      :
      (<div>
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
          <h4>Security Questions</h4>

          <div className='flex flex-col text-left mb-8'>
            <p className='bk-text-colour pl-2'>*Security Question 1*</p>
            <input
            onBlur={(e) => onBlur(e.target.name, e.target.value, 0)}
            className='mt-2'
              id='answer'
              name='answer'
              type='text'
              placeholder='Enter your email address'
            />
            <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p>
          </div>
          <div className='flex flex-col text-left mb-8'>
            <p className='bk-text-colour pl-2'>*Security Question 2*</p>
            <input
            onBlur={(e) => onBlur(e.target.name, e.target.value, 0)}
            className='mt-2'
              id='answer'
              name='answer'
              type='text'
              placeholder='Enter your email address'
            />
            <p className='text-sm text-rose-500 pt-2 pl-2'>{errorMsg}</p>
          </div>
        </div>
        <button onClick={onSubmit} type='submit' className='btn-primary'>
          Submit
        </button>
        <div className='h-4'></div>
      </div>)
      }
    </div>
  );
};
export default ForgotPassword;

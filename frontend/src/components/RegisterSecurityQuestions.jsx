import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownSelect } from "../components/DropdownSelect/index";
import securityQuestions from "../static/securityQuestions.json";

const RegisterSecurityQuestions = (props) => {
  const [questions, setQuestions] = useState([]);
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

  const onSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    for (let index = 0; index < answers.length; index++) {
      const element = answers[index];

      if (element.question === "") valid = false;
      if (element.answer === "") valid = false;
      !valid && toast.error(`Empty fields`)
    }

    if(answers[0].question === answers[1].question) {
      valid = false; 
      toast.error(`Can't have duplicate questions`)
      return;
    }

    if (valid) {
      props.registerUser(answers)
    }
  };

  return (
    <div>
      <div className='px-12 pt-6'>
        <h1
          className='bk-text-colour text-[35px] font-thunderBoldLC tracking-[3px]'
        >
          Security Questions
        </h1>

        <div className='flex flex-col text-left mb-8'>
          <p className='bk-text-colour pl-2'>Question 1</p>
          <DropdownSelect
            onSelect={(value) => onBlur("question", value, 0)}
            placeholder='Choose a security question'
            array={questions}
          />
          <input
            onBlur={(e) => onBlur(e.target.name, e.target.value, 0)}
            className='mt-2'
            id='answer'
            name='answer'
            type='text'
            placeholder='Answer'
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                onSubmit(e);
              }
            }}
          />
        </div>
        <div className='flex flex-col text-left mb-12'>
          <p className='bk-text-colour pl-2'>Question 2</p>
          <DropdownSelect
            onSelect={(value) => onBlur("question", value, 1)}
            placeholder='Choose a security question'
            array={questions}
          />
          <input
            onBlur={(e) => onBlur(e.target.name, e.target.value, 1)}
            className='mt-2'
            id='answer'
            name='answer'
            type='text'
            placeholder='Answer'
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                onSubmit(e);
              }
            }}
          />
        </div>
      </div>
      <button onClick={onSubmit} type='submit' className='btn-primary'>
        Save
      </button>
      <div className='h-4'></div>
    </div>
  );
};
export default RegisterSecurityQuestions;

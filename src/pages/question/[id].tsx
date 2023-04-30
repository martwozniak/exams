import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { api } from "../../utils/api";
const ALPHABET = ["A","B","C", "D", "E", "F", "G", "H", "I", "J", "K"];

export default function ShowSingleQuestion() {

  const router = useRouter();
  const identifier = router?.query?.id?.toString();
  console.log(identifier);
  const [correctAnswerID, setCorrectAnswerID] = useState("");

  if(!identifier) {return null}

  const findCorrect = () => {
    singleQuestionQuery?.data?.answers.map((a) => {
      if(a.isCorrect) {
        setCorrectAnswerID(a.identifier);
      }
    })
  }

  const highlightCorrect = () => {
    const correctAnswer = document.getElementById(`div-${correctAnswerID}`);
    correctAnswer?.classList.add("bg-green-500");
  }

  const singleQuestionQuery = api.question.getOne.useQuery({ slug: identifier });
  console.log(singleQuestionQuery.data);

  return (
    <div className='bg-slate-950 min-h-screen text-slate-200 px-4'>
      <div className='flex justify-center'>
          <div className='container border px-4 py-2 border-slate-800 rounded-xl py-6'>
          <h1>{singleQuestionQuery?.data?.body}</h1>
          {singleQuestionQuery?.data?.answers.map((a, iterator) => (
        
                    <div key={a.identifier} id={`div-${a.identifier}`} className="px-2  transition-all py-2 rounded-xl cursor-pointer focus:text-white">
                      <label htmlFor={`answer-${a.identifier}`}>{`${ALPHABET[iterator]!.toLowerCase()})`} {a.body}</label>
                    </div>
                    
                  ))}
          <button className='bg-slate-800 text-slate-200 px-4 py-2 rounded-xl' onClick={
             () => {
              findCorrect();
              highlightCorrect();
            }
          }>Show correct answer</button>
          </div>

      </div>
     


    </div>
  )
}
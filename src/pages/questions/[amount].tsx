import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { api } from "../../utils/api";
import Head from 'next/head';
import { Answer, Question } from '@prisma/client';
import Link from 'next/link';
import CTA from '~/components/CTA/CTA';
const ALPHABET = ["A","B","C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];

export default function ShowAmountOfQuestions() {

  const router = useRouter();
  const identifier = router.query.id! as string;
  const amount = Number(router.query.amount!);
  console.log("Amount", amount)
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const singleQuestionQuery = api.question.getRandomOne.useQuery({ numberOfQuestions: Number(amount) }, {
    onSuccess: (data) => {
      setDataIsLoaded(true);
    }
  });


  const highlightCorrect = (correctId : string) => {
    const correctAnswer = document.getElementById(`div-${correctId}`);
    correctAnswer?.classList.add("bg-green-500");
  }

  console.log(singleQuestionQuery?.data);
  const questionExamIdentifier = 3;
  // Find related questions with the same examId
  const relatedQuestionsQuery = api.question.getManyRandomRecommendation.useQuery({ examID: String(questionExamIdentifier) }, {
    onSuccess: (data) => {
      console.log("Data related to id", data);
    }
  });
  console.log("Related questions", relatedQuestionsQuery?.data)


  return (
    <>
    <Head>

    </Head>
    <div className='bg-slate-950 min-h-screen text-slate-200 px-4'>
      <div className='flex justify-center'>
          <div className='container border px-4 py-2 border-slate-800 rounded-xl py-6'>
     
 
          </div>
      </div>
      <div className='mt-4 px-4 flex flex-col gap-4 justify-center items-center'>
        <div className='container'>
        <span>Podobne pytania</span>
        <div>
        {/* {relatedQuestionsQuery?.data?.body.map((a, iterator) => (
        
        <div key={a.identifier} id={`div-${a.identifier}`} className="px-2  transition-all py-2 rounded-xl cursor-pointer focus:text-white">
          <label htmlFor={`answer-${a.identifier}`}>{`${ALPHABET[iterator]!.toLowerCase()})`} {a.body}</label>
        </div>
        
      ))} */}

      {
        relatedQuestionsQuery?.data?.map((q : Question) => (
          <div key={q.id} className='cursor-pointer'>
          <Link href={`/question/${q.id}`} key={q.id} className='cursor-pointer'>
            <div key={q.id} className="cursor-pointer transition-all py-2 rounded-xl cursor-pointer text-slate-600 hover:text-slate-200 transition-all focus:text-white">
              <label htmlFor={`answer-${q.id}`} className='cursor-pointer'>{q.body}</label>
            </div>
          </Link>
          </div>
        ))
      }
        </div>
        </div>
      </div>
    
      <CTA/>

    </div>
    </>
  )
}
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { api } from "../../utils/api";
import Head from 'next/head';
const ALPHABET = ["A","B","C", "D", "E", "F", "G", "H", "I", "J", "K"];

export default function ShowSingleQuestion() {

  const router = useRouter();
  const identifier = router.query.id! as string;
  const singleQuestionQuery = api.question.getOne.useQuery({ slug: identifier });


  const highlightCorrect = (correctId : string) => {
    const correctAnswer = document.getElementById(`div-${correctId}`);
    correctAnswer?.classList.add("bg-green-500");
  }

  console.log(singleQuestionQuery?.data);


  const findCorrect = ()  => {
    singleQuestionQuery.data?.answers?.map((a) => {
      if(a.isCorrect) {
        highlightCorrect(a.identifier);
      }
    })
  }

  const answerCount = singleQuestionQuery.data?.answers?.length;
  const correctBody = singleQuestionQuery.data?.answers?.map((a) => {
    if(a.isCorrect) {
      return(a.body);
    }
  });

  return (
    <>
    <Head>
      <title>{singleQuestionQuery?.data?.body}</title>
      <meta name="description" content={singleQuestionQuery?.data?.body} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:`
    {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": "${singleQuestionQuery?.data?.body || ""}",
    "upvoteCount": "196",
    "text": "${singleQuestionQuery?.data?.body || ""}",
    "answerCount": "${String(answerCount)}",
    "acceptedAnswer": {
        "@type": "Answer",
        "text": "${String(correctBody) || ""}",
    },
    "suggestedAnswer": {
        "@type": "Answer",
        "text": "${String(correctBody) || ""}",
    }
}
`}}></script>
    </Head>
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
                 findCorrect()          
              }}>Show correct answer</button>
          </div>
      </div>
    </div>
    </>
  )
}
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import Head from 'next/head';
import { Answer, Question } from '@prisma/client';
import Link from 'next/link';
import CTA from '~/components/CTA/CTA';
const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
];

export default function ShowAmountOfQuestions() {
  const router = useRouter();
  const identifier = router.query.id! as string;
  const amount = Number(router.query.amount!);
  console.log('Amount', amount);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const singleQuestionQuery = api.question.getRandomOne.useQuery(
    { numberOfQuestions: Number(amount) },
    {
      onSuccess: (data) => {
        setDataIsLoaded(true);
      },
    }
  );

  const highlightCorrect = (correctId: string) => {
    const correctAnswer = document.getElementById(`div-${correctId}`);
    correctAnswer?.classList.add('bg-green-500');
  };

  console.log(singleQuestionQuery?.data);
  const questionExamIdentifier = 3;
  // Find related questions with the same examId
  const relatedQuestionsQuery =
    api.question.getManyRandomRecommendation.useQuery(
      { examID: String(questionExamIdentifier) },
      {
        onSuccess: (data) => {
          console.log('Data related to id', data);
        },
      }
    );
  console.log('Related questions', relatedQuestionsQuery?.data);

  return (
    <>
      <Head></Head>
      <div className="min-h-screen bg-slate-950 px-4 text-slate-200">
        <div className="flex justify-center">
          <div className="container rounded-xl border border-slate-800 px-4 py-2 py-6"></div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 px-4">
          <div className="container">
            <span>Podobne pytania</span>
            <div>
              {/* {relatedQuestionsQuery?.data?.body.map((a, iterator) => (
        
        <div key={a.identifier} id={`div-${a.identifier}`} className="px-2  transition-all py-2 rounded-xl cursor-pointer focus:text-white">
          <label htmlFor={`answer-${a.identifier}`}>{`${ALPHABET[iterator]!.toLowerCase()})`} {a.body}</label>
        </div>
        
      ))} */}

              {relatedQuestionsQuery?.data?.map((q: Question) => (
                <div key={q.id} className="cursor-pointer">
                  <Link
                    href={`/question/${q.id}`}
                    key={q.id}
                    className="cursor-pointer"
                  >
                    <div
                      key={q.id}
                      className="cursor-pointer cursor-pointer rounded-xl py-2 text-slate-600 transition-all transition-all hover:text-slate-200 focus:text-white"
                    >
                      <label
                        htmlFor={`answer-${q.id}`}
                        className="cursor-pointer"
                      >
                        {q.body}
                      </label>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CTA />
      </div>
    </>
  );
}

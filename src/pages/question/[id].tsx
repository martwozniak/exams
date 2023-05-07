import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import Head from 'next/head';
import { type Answer, type Question } from '@prisma/client';
import Link from 'next/link';
import CTA from '~/components/CTA/CTA';
import { type GetServerSidePropsContext, type NextPage } from 'next';

type ServerGeneratedStarterProps = {
  test: number;
};

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

const ShowSingleQuestion: NextPage<ServerGeneratedStarterProps> = ({
  test,
}) => {
  console.log(test);
  const router = useRouter();
  const identifier = router.query.id! as string;
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const singleQuestionQuery = api.question.getOne.useQuery(
    { slug: identifier },
    {
      onSuccess: (data) => {
        setDataIsLoaded(true);
        console.log('Data', data);
      },
    }
  );

  const highlightCorrect = (correctId: string) => {
    const correctAnswer = document.getElementById(`div-${correctId}`);
    correctAnswer?.classList.add('bg-green-500');
  };

  console.log(singleQuestionQuery?.data);

  const findCorrect = () => {
    singleQuestionQuery.data?.answers?.map((a) => {
      if (a.isCorrect) {
        highlightCorrect(a.identifier);
      }
    });
  };

  const answerCount = singleQuestionQuery.data?.answers?.length;
  const correctBody = singleQuestionQuery.data?.answers?.map((a: Answer) => {
    if (a.isCorrect) {
      return a.body;
    }
  });

  const questionExamIdentifier = dataIsLoaded
    ? singleQuestionQuery.data?.examId
    : '0';
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
      <Head>
        <title>{singleQuestionQuery?.data?.body}</title>
        <meta name="description" content={singleQuestionQuery?.data?.body} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
    {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": "${singleQuestionQuery?.data?.body || ''}",
    "text": "${singleQuestionQuery?.data?.body || ''}",
    "answerCount": "${String(answerCount)}",
    "acceptedAnswer": {
        "@type": "Answer",
        "text": "${String(correctBody) || ''}"
    },
    "suggestedAnswer": {
        "@type": "Answer",
        "text": "${String(correctBody) || ''}"
    }
}
`,
          }}
        ></script>
      </Head>
      <div className="min-h-screen bg-slate-950 px-4 text-slate-200">
        <div className="flex justify-center">
          <div className="container rounded-xl border border-slate-800 px-4 py-2 py-6">
            <h1>{singleQuestionQuery?.data?.body}</h1>
            {singleQuestionQuery?.data?.answers.map((a, iterator) => (
              <div
                key={a.identifier}
                id={`div-${a.identifier}`}
                className="cursor-pointer  rounded-xl px-2 py-2 transition-all focus:text-white"
              >
                <label htmlFor={`answer-${a.identifier}`}>
                  {`${ALPHABET[iterator]!.toLowerCase()})`} {a.body}
                </label>
              </div>
            ))}
            <button
              className="rounded-xl bg-slate-800 px-4 py-2 text-slate-200"
              onClick={() => {
                findCorrect();
              }}
            >
              Show correct answer
            </button>
          </div>
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
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const simulate = await new Promise((resolve) => setTimeout(resolve, 1));
  const session = 1; //await getServerAuthSession(ctx);

  console.log(simulate);
  console.log(session);
  console.log(ctx);

  return {
    props: {
      test: 1,
    },
  };
}

export default ShowSingleQuestion;

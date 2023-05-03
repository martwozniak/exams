import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '~/utils/api';

export default function Exams() {
  const router = useRouter();
  const { examID } = router.query;
  const tempID = examID as string;

  const exam = api.exam.getSpecificExam.useQuery({ examId: tempID });

  return (
    <div className="h-screen bg-slate-950 text-slate-200">
      <div className="flex justify-center">
        <div className="container flex items-center gap-12 py-6">
          <div className="w-1/2 rounded-xl border border-slate-800 px-4 py-2">
            <h1 className="text-3xl font-bold text-slate-50 ">
              {' '}
              {exam.data?.name}
            </h1>
          </div>
          <div className="flex w-1/2 text-slate-200">
            <div className="flex gap-4">
              <button className="rounded-xl border border-emerald-800 px-4 py-2">
                Test 1 pytanie
              </button>
              <button className="rounded-xl border border-yellow-800 px-4 py-2">
                Test 15 pytan
              </button>
              <button className="rounded-xl border border-red-800 px-4 py-2">
                Test 40 pytanie
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container grid grid-cols-2 items-center gap-4 py-6 text-slate-200">
          {exam.data?.questions.map((question) => (
            <Link key={question.id} href={`/question/${question.id}`}>
              <div
                key={question.id}
                className="cursor-pointer rounded-xl border border-slate-800 px-4 py-2 transition-all hover:bg-slate-800"
              >
                <span className="font-bold text-slate-50 transition-all ">
                  {question.body}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

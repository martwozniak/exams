import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { api } from '~/utils/api'


export default function Exams() {
  const router = useRouter();
  const { examID } = router.query;
  const tempID = examID as string;

  const exam = api.exam.getSpecificExam.useQuery({ examId: tempID});

  return (
    <div className='h-screen bg-slate-950 text-slate-200'>
        <div className='flex justify-center'>
            <div className='container py-6 flex gap-12 items-center'>
            <div className='w-1/2 border px-4 py-2 border-slate-800 rounded-xl'>
                <h1 className='text-3xl text-slate-50 font-bold '>    {exam.data?.name}</h1>
            </div>
            <div className='w-1/2 text-slate-200 flex'>
            
                <div className='flex gap-4'>
                    <button className='border border-emerald-800 px-4 py-2 rounded-xl'>Test 1 pytanie</button>
                    <button className='border border-yellow-800 px-4 py-2 rounded-xl'>Test 15 pytan</button>
                    <button className='border border-red-800 px-4 py-2 rounded-xl'>Test 40 pytanie</button>
                </div>
            </div>
        </div>
        </div>

        {/** Every mod 6 show cta that will convince people that creating account is worth it!  */}
        <div className='flex justify-center'>
            <div className='container py-6 grid gap-4 items-center grid-cols-2 text-slate-200'>
                {exam.data?.questions.map((question) => (
                    <Link key={question.id} href={`/question/${question.id}`}>
                    <div key={question.id} className='border px-4 py-2 border-slate-800 rounded-xl transition-all hover:bg-slate-800 cursor-pointer'>
                        <span className='text-slate-50 font-bold transition-all '>{question.body}</span>
                    </div>
                    </Link>
                ))}
          </div>
        </div>
    </div>
  )
}
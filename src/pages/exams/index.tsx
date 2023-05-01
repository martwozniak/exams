import Link from 'next/link';
import React from 'react'
import { api } from '~/utils/api'


export default function Exams() {
  const exams = api.exam.getAllExams.useQuery();
  return (
    <div className='h-screen bg-slate-950 text-slate-200'>
        <div className='flex justify-center'>
            <div className='container py-6 flex gap-12 items-center'>
            <div className='w-1/2 border px-4 py-2 border-slate-800 rounded-xl'>
                <h1 className='text-3xl text-slate-50 font-bold '>Exams</h1>
            </div>
            <div className='w-1/2 text-slate-200'>
                <div>Dostep do 150 egzaminow</div>
                <div>Dostep do 150 513 pytan egzaminacyjnych</div>
            </div>
        </div>
        </div>

        <div className='flex justify-center'>
            <div className='container py-6 grid gap-12 items-center grid-cols-4'>
            {exams.data?.map((exam) => (
                <Link key={exam.id} href={`/exams/${exam.id}`}>
                 <div key={exam.id} className='border px-4 py-2 border-slate-800 rounded-xl transition-all hover:bg-slate-800 cursor-pointer'>
                    <span className='text-slate-50 font-bold transition-all '>{exam.name}</span>
                </div>
                </Link>
  
            ))}

          </div>
        </div>
    </div>
  )
}
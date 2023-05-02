import Link from 'next/link';
import React from 'react';
import { api } from '~/utils/api';

export default function Exams() {
  const exams = api.exam.getAllExams.useQuery();
  return (
    <div className="h-screen bg-slate-950 text-slate-200">
      <div className="flex justify-center">
        <div className="container flex items-center gap-12 py-6">
          <div className="w-1/2 rounded-xl border border-slate-800 px-4 py-2">
            <h1 className="text-3xl font-bold text-slate-50 ">Egzaminy</h1>
          </div>
          <div className="w-1/2 text-slate-200">
            <div>Dostep do 150 egzaminow</div>
            <div>Dostep do 150 513 pytan egzaminacyjnych</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container grid grid-cols-4 items-center gap-12 py-6">
          {exams.data?.map((exam) => (
            <Link key={exam.id} href={`/exams/${exam.id}`}>
              <div
                key={exam.id}
                className="cursor-pointer rounded-xl border border-slate-800 px-4 py-2 transition-all hover:bg-slate-800"
              >
                <span className="font-bold text-slate-50 transition-all ">
                  {exam.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

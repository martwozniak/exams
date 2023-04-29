import React from 'react'
import Header from '../Header/Header';

type Props = {
    title: string;
    description: string;
    points: number;
    maxPoints: number;
    timeLeft: string;
    timeOut: boolean;
    answerCounter: number;
    examId: string;
    token: string;
}

export default function ResultPopover({title,description, points, maxPoints, timeLeft, timeOut, answerCounter, examId, token}: Props) {
  return (
    <div className='transition-all flex items-center justify-center min-h-3xl w-screen bg-blur absolute bg-slate-950/80 h-screen z-[200]'>
      
        <div className='border flex-col gap-4 text-slate-300 px-8 py-16 border-slate-800 rounded-xl bg-slate-950'>
            <div className='w-[70vw] sm:container flex flex-col mx-2'>
              <span className='text-xl sm:text-3xl font-bold'>{title}</span>
              <span className='text-xl sm:text-3xl  font-bold'>{description}</span>
              <span className='text-xl sm:text-3xl  font-bold'>{points}/{maxPoints} points </span>
              <span className='text-xl sm:text-3xl  font-bold'>{timeOut ? `Time left ${timeLeft} seconds` : timeLeft}</span>
              <span className='text-xl sm:text-3xl  font-bold'>{answerCounter} questions answered</span>
            </div>
        </div>
    </div>
  )
}
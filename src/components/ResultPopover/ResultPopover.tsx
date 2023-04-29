import React from 'react'

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
    <div className='w-screen h-screen bg-emerald-600'>
        <div className='flex items-center justify-center h-screen flex-col gap-4'>
            <span className='text-3xl font-bold'>{title}</span>
            <span className='text-3xl font-bold'>{description}</span>

        </div>
    </div>
  )
}
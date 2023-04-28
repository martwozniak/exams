import React from 'react'
import './StatsBar.module.css';
type Props = {
    answerCounter: number;
    maxAnswers: number;
    userPoints: number;
    progressPercent: number;
    timeOut: boolean;
    timeLeft: string;
}

export default function StatsBar({answerCounter, maxAnswers, userPoints, progressPercent, timeOut, timeLeft}: Props) {
  //const cla = "w-["+ String((progressPercent.toFixed(0))) +"%]";
  const cla = "w-[15%]" 
  return (
    <>
     <div className="stats absolute bottom-0 left-0">
            <div className="flex w-screen items-center p-4  gap-20 border-slate-900 border-t text-slate-700">
                    <div className="flex gap-2 w-48">
                      <p>Time left</p>
                      <p className="text-slate-300">{timeOut ? "Time left" : timeLeft}</p>
                    </div>
                    <div className="flex gap-2  w-24">
                      <p>Answers</p>
                      <p className="text-slate-300">{answerCounter}/{maxAnswers}</p>
                    </div>
                    <div className="flex gap-2  w-24">
                      <p>Points</p>
                      <p className="text-slate-300">{userPoints}</p>
                    </div>
                    <div className="flex gap-16 w-full items-center">
                      <p>Progress</p>
                      <div className="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-700">
                        <div className={`bg-green-600 h-2.5 rounded-full dark:bg-green-500 progressbar`}></div>
                      </div>
                      <div>{Number(progressPercent.toFixed(0))}%</div>
                    </div>
            </div>
        </div>
    </>
  )
}
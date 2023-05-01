import React from 'react'
import './StatsBar.module.css';
import { MdBrowseGallery, MdOutlineIncompleteCircle, MdOutlineDiamond,MdLocalFireDepartment, MdOutlineDateRange } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
    answerCounter: number;
    maxAnswers: number;
    userPoints: number;
    progressPercent: number;
    timeOut: boolean;
    timeStarted: number;
    pauseCountdown: boolean;
    timeEnded: number;
    finalTime: number;
    duration: number;
}

export default function StatsBar({answerCounter, maxAnswers, userPoints, progressPercent, timeOut, timeStarted, pauseCountdown, timeEnded, finalTime, duration}: Props) {

  const timeLeft = !pauseCountdown ? timeStarted + (duration) - Date.now() : (timeEnded-timeStarted);

  return (
    <>
     <div className="stats flex  bottom-0 left-0 z-50 bg-slate-950 fixed w-full justify-center">
            <div className="flex container items-center p-4  gap-4 sm:gap-20 border-slate-900 border rounded-xl text-slate-700 text-xs sm:text-sm">
                    <div className="hidden sm:flex gap-2 w-24 sm:w-64 items-center">
                      <div><MdOutlineDateRange className='text-xl'/></div>
                      <p className="text-slate-300 w-max">{`${dayjs(new Date()).format("MM.DD.YYYY HH:m")}`}</p>
                    </div>
                    <div className="flex gap-2 w-24 items-center w-fit">
                      <div><MdBrowseGallery className='text-xl'/></div>
                      <p className="text-slate-300 w-max">{`${dayjs(timeLeft).format("mm:ss")}`}</p>
                    </div>
                    <div className="flex gap-2  w-14 items-center">
                      <div><MdOutlineIncompleteCircle className='text-xl'/></div>
                      <p className="text-slate-300">{answerCounter}/{maxAnswers}</p>
                    </div>
                    <div className="flex gap-2 hidden w-14 items-center">
                     <div><MdLocalFireDepartment className='text-xl'/> </div>
                      <p className="text-slate-300">0</p>
                    </div>
                    <div className="flex gap-2  w-12 items-center">
                     <div><MdOutlineDiamond className='text-xl'/> </div>
                      <p className="text-slate-300">{userPoints}</p>
                    </div>

                    <div className="flex gap-2 sm:gap-16 w-full items-center">
            
                      <div className="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-700 transition-all">
                        <div className={`bg-green-600 h-2.5 rounded-full dark:bg-green-500 progressbar transition-all`} style={{width:`${Number(progressPercent.toFixed(0))}`+"%"}}></div>
                      </div>
                      <div className='text-slate-400'>{Number(progressPercent.toFixed(0))}%</div>
                    </div>
            </div>
        </div>
    </>
  )
}
import React from 'react'
import Header from '../Header/Header';
import { MdBrowseGallery, MdOutlineIncompleteCircle, MdContentCopy, MdOutlineDiamond,MdLocalFireDepartment, MdOutlineDateRange, MdIncompleteCircle } from "react-icons/md";
import toast from "react-hot-toast";

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
// TODO: Different messages for different results
// TODO: Different gif for different results
// TODO: Action buttons: Try again, Go to dashboard, Go to exam
// TODO: If not logged in show CTA to create account or log in

export default function ResultPopover({title,description, points, maxPoints, timeLeft, timeOut, answerCounter, examId, token}: Props) {
  return (
    <div className='transition-all flex items-center justify-center min-h-3xl w-screen bg-blur flex-col absolute bg-slate-950/80 h-screen z-[200]'>
      

        <div className='border flex-col gap-4 text-slate-300 px-8 py-16 border-slate-800 rounded-xl bg-slate-950'>
          <span className='text-xl sm:text-3xl font-bold text-green-500'>{description}</span>

           <img src="https://media.tenor.com/r1hf8zhfBskAAAAM/jerry-springer-talk.gif" alt='Meme' className='w-full mt-6'/>
            <div className='w-[70vw] sm:container flex flex-col mx-2 mt-6'>
    

              <div className='border rounded-xl border-slate-800 flex justify-around gap-2 py-2 text-xs '>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Exam ID</span>
                  <span className='font-bold'>{examId}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Time started</span>
                  <span className='font-bold'>{examId}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Time ended</span>
                  <span className='font-bold'>{examId}</span>
                </div>
              </div>

              <div className='border mt-8 rounded-xl border-slate-800 flex justify-around gap-4 py-8 py-4'>
                <div className='flex flex-col justify-center items-center'>
                <MdBrowseGallery className='text-xl'/>
                  <span className='text-xl sm:text-3xl  font-bold'>{timeLeft}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                <MdIncompleteCircle className='text-xl'/>
                  <span className='text-xl sm:text-3xl  font-bold'>{answerCounter}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                <MdLocalFireDepartment className='text-xl'/> 
                <span className='text-xl sm:text-3xl  font-bold'>{maxPoints}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                <MdOutlineDiamond className='text-xl'/> 
                <span className='text-xl sm:text-3xl  font-bold'>{points}</span>
                </div>
              </div>

              <div className='mx-2 mt-6'>
              <span>Share your results</span>
              <div className='flex gap-2 mt-2 border border-slate-900 rounded-xl w-full bg-slate-900 py-2 px-2 justify-between items-center'>
                  <span>link</span>
                  <MdContentCopy className='cursor-pointer' onClick={() => {
                    console.log('copy')
                    toast.success('Copied to clipboard')
                    // Copy to clipboard
                    // Show toast
                  }}/>
               
              </div>
              </div>
            </div>
        </div>
    </div>
  )
}
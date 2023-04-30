import React from 'react'
import Header from '../Header/Header';
import { MdBrowseGallery, MdOutlineIncompleteCircle, MdContentCopy, MdOutlineDiamond,MdLocalFireDepartment, MdOutlineDateRange, MdIncompleteCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, XAxis, CartesianGrid, Tooltip, YAxis, Area, BarChart, Legend, Bar } from 'recharts';
import dayjs from 'dayjs';

type Props = {
    title: string;
    description: string;
    points: number;
    maxPoints: number;
    timeLeft: number;
    timeOut: boolean;
    answerCounter: number;
    examId: string;
    token: string;
    timeStarted: number;
    timeEnded: number;
    finalTime: number;
}
// TODO: Different messages for different results
// TODO: Different gif for different results
// TODO: Action buttons: Try again, Go to dashboard, Go to exam
// TODO: If not logged in show CTA to create account or log in


export default function ResultPopover({title,description, points, maxPoints, timeLeft, timeOut, answerCounter, examId, token, timeStarted, timeEnded, finalTime}: Props) {
  const wrong = maxPoints - points;
  const data = [
    { name: 'Correct', value: Number(points), color: "green" },
    { name: 'Wrong', value: Number(wrong), color: "red" }
  ];
 
  return (
    <div className='transition-all flex items-center justify-center min-h-3xl  w-screen bg-blur flex-col absolute bg-slate-950/80 h-screen z-[200]'>
      

        <div className='border min-h-full flex-col gap-2 sm:gap-4 text-slate-300 px-2 sm:px-8 py-4 sm:py-16 border-slate-800 rounded-xl bg-slate-950'>
          <span className='text-xl sm:text-3xl font-bold text-green-500'>{description}</span>

           <img src="https://media.tenor.com/r1hf8zhfBskAAAAM/jerry-springer-talk.gif" alt='Meme' className='w-full mt-6'/>
            <div className='w-full  sm:container flex flex-col mt-2 sm:mt-6'>
    

              <div className='border rounded-xl border-slate-800 flex justify-around gap-2 py-2 text-xs '>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Exam ID</span>
                  <span className='font-bold'>{examId}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Time started</span>
                  <span className='font-bold'>{dayjs(timeStarted).format()}</span>
                </div>
                <div className='flex flex-col gap-2 '>
                  <span className='font-bold'>Time ended</span>
                  <span className='font-bold'>{dayjs(timeEnded).format()}</span>
                </div>
                <div className='flex flex-col gap-2 '>
                  <span className='font-bold'>Final time</span>
                  <span className='font-bold'>{dayjs(finalTime).format()}</span>
                </div>
              </div>

              <div className='border mt-8 rounded-xl border-slate-800 flex justify-around gap-4 py-8 py-4'>
                <div className='flex flex-col justify-center items-center'>
                <MdBrowseGallery className='text-xl'/>
                  <span className='text-xl sm:text-3xl  font-bold'>{dayjs(timeEnded-timeStarted).format("mm:ss")}</span>
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
                  <div className='text-slate-500'>https://website-host-env-variable.com/results/<span className='text-slate-50'>{`${examId}`}</span></div>
                  <MdContentCopy className='cursor-pointer' onClick={() => {
                    async () => {
                      const results = await navigator.clipboard.writeText(`https://website-host-env-variable.com/results/${examId}`).then(() => { return true }).catch(() => { return false })
                      console.log('copy')
                      toast.success('Copied to clipboard')
                    }
                  }}/>
               
              </div>
              </div>
              <div className='mx-2 mt-6'>
              <span>Statistics</span>
              <div className='flex gap-2 sm:gap-4 flex-col sm:flex-row bg-slate-950'>
              <div className="flex flex-col sm:flex-row gap-2">
                <BarChart width={230} height={250} data={data} className='hidden sm:flex'>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#475569" />

                </BarChart>

                <PieChart width={200} height={200}>
                  <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie> 
                </PieChart>
              </div>
              
           
              <div className='w-full'>
                <table className='flex gap-2 flex-col w-full'>
                  <tr className='text-green-600 flex justify-between'>
                    <td>Correct</td>
                    <td className='font-bold'>{points}</td>
                  </tr>
                  <tr className='text-red-600 flex justify-between'>
                    <td>Wrong</td>
                    <td className='font-bold'>{wrong}</td>
                  </tr>

                </table>
              </div>
              </div>


              </div>
             
            </div>
        </div>
    </div>
  )
}
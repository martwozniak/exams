import React, { ReactNode } from 'react'
import Header from '../Header/Header';
import { MdBrowseGallery, MdOutlineIncompleteCircle, MdContentCopy, MdOutlineDiamond,MdLocalFireDepartment, MdOutlineDateRange, MdIncompleteCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, XAxis, CartesianGrid, Tooltip, YAxis, Area, BarChart, Legend, Bar } from 'recharts';
import dayjs from 'dayjs';
import ReactPDF from '@react-pdf/renderer';
import Clipboard from 'react-clipboard.js';
import { AiFillFacebook, AiFillYoutube,AiFillInstagram, AiFillTwitterSquare, AiFillGoogleCircle } from "react-icons/ai";
import { BsDiscord, BsMailbox, BsDownload } from "react-icons/bs";

type Props = {
    title: string;
    description: string;
    points: number;
    maxPoints: number;
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


export default function ResultPopover({title,description, points, maxPoints, timeOut, answerCounter, examId, token, timeStarted, timeEnded, finalTime}: Props) {
  const wrong = maxPoints - points;
  const data = [
    { name: 'Correct', value: Number(points), color: "green" },
    { name: 'Wrong', value: Number(wrong), color: "red" }
  ];

  const totalTime = finalTime - timeStarted;
  const examGeneratedLink = `${window.location.hostname}/results/${examId}`;

  const toastSuccessCopied = () => toast.success("Copied to clipboard");

  return (
    <>
    <div className='flex items-center justify-center sm:mx-4 pb-12'>
    <div className='transition-all w-full flex items-center justify-center min-h-3xl flex-col bg-slate-950/80'>
      

        <div className='border min-h-full max-w-full w-full flex-col gap-2 sm:gap-4 text-slate-300 px-2 sm:px-8 py-4 sm:py-16 border-slate-800 rounded-xl bg-slate-950'>
    
          <div className='flex items-center gap-4'>
           <div> {getAnimatedImage(points, maxPoints)}</div>
         {getResultTitle(points,maxPoints)}
          </div>
       
          
            <div className='sm:container flex flex-col mt-2 sm:mt-6'>
    

              <div className='border flex-col sm:flex-row rounded-xl border-slate-800 flex justify-around gap-2 py-2 text-xs '>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Exam ID</span>
                  <span className='font-bold'>{examId}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Time started</span>
                  <span className='font-bold'>{dayjs(timeStarted).format("H:m s/60")}</span>
                </div>
                <div className='flex flex-col gap-2 '>
                  <span className='font-bold'>Time ended</span>
                  <span className='font-bold'>{dayjs(timeStarted+(timeEnded-timeStarted)).format("H:m s/60")}</span>
                </div>
                <div className='flex flex-col gap-2 '>
                  <span className='font-bold'>Final time</span>
                  <span className='font-bold'>{dayjs(finalTime).format("H:m s/60")}</span>
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

              <div className='mx-2 mt-6 flex items-center gap-4 flex flex-col sm:flex-row'>
              <span>Share your results</span>

              <Clipboard data-clipboard-text={examGeneratedLink} onSuccess={toastSuccessCopied}>
              <div className='flex gap-2  border border-slate-900 rounded-xl w-full bg-slate-900 py-2 px-2 justify-between items-center'>
                  <div className='text-slate-500'>{examGeneratedLink}</div>
                  <MdContentCopy className='cursor-pointer'/>
              </div>
              </Clipboard>
              <span>
                Follow our Social Media
              </span>
              <div className='flex flex-row gap-2 text-slate-800'>
                <a href="https://www.facebook.com/">
                  <AiFillFacebook className='text-3xl cursor-pointer transition-all hover:text-slate-50'/>
                </a>
                <a href="https://www.instagram.com/">
                  <AiFillInstagram className='text-3xl cursor-pointer transition-all hover:text-slate-50'/>
                </a>
                <a href="https://www.twitter.com/">
                  <AiFillTwitterSquare className='text-3xl cursor-pointer transition-all hover:text-slate-50'/>
                </a>
                <a href="https://www.youtube.com/">
                  <AiFillYoutube className='text-3xl cursor-pointer transition-all hover:text-slate-50'/>
                </a>
                <a href="https://www.discord.com/">
                  <BsDiscord className='text-3xl cursor-pointer transition-all hover:text-slate-50'/>
                </a>
              </div>
              <div className='flex gap-2 items-center'>
                  <span>Send</span>
                  <div>
                    <a href="https://www.gmail.com/">
                      <BsMailbox className='text-3xl text-slate-800 cursor-pointer transition-all hover:text-slate-50'/>
                    </a>
                  </div>
                  <span>Download</span>
                  <div>
                    <a href="https://www.gmail.com/">
                      <BsDownload className='text-2xl text-slate-800 cursor-pointer transition-all hover:text-slate-50'/>
                    </a>
                  </div>
              </div>
              </div>
     
              <div>
         
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
                <div className='flex gap-2 flex-col w-full'>
                  <div className='text-green-600 flex justify-between gap-2'>
                    <div>Correct</div>
                    <div className='font-bold'>{points}</div>
                  </div>
                  <div className='text-red-600 flex justify-between gap-2'>
                    <div>Wrong</div>
                    <div className='font-bold'>{wrong}</div>
                  </div>
                </div>
                <div>
                  <div className='flex justify-between mt-2 gap-2'>
                    <div className='text-slate-300'>Total</div>
                    <div className='font-bold'>{maxPoints}</div>
                  </div>
                </div>
                <div className='border-t mt-4 border-slate-700'>
                  <div className='flex justify-between mt-2 gap-2'>
                    <div className='text-slate-300'>Final score</div>
                    <div className='font-bold'>{points}/{maxPoints}</div>
                  </div>
                  <div className='flex justify-between mt-2 gap-2'>
                    <div className='text-slate-300'>Final result</div>
                    <div className='font-bold'>{getExamResult(points, maxPoints, false)}</div>
                  </div>
                </div>
              </div>
              </div>

              <div>
                <button className='bg-slate-900 text-slate-50 px-4 py-2 rounded-xl mt-4' onClick={() => {
                    // void ReactPDF.render(<ResultPopover />, `/example.pdf`);
                    console.log("Downloading")


                } }>Download results</button>
              </div>
              </div>
             
            </div>
        </div>
    </div></>
  )
}

const getExamResult = (points:number, maxPoints:number, onlyStatus:boolean) => {
  const percentage = (points / maxPoints) * 100
  if(onlyStatus) {
    if(percentage >= 50) {
      return 'Passed'
    } else if(percentage < 50) {
      return 'Failed'
    }
    else {
      return 'Unknown'
    }
  }
  if (percentage >= 50) {
    return(<>
    <div>
      <div className='text-green-600'>Passed</div>
    </div>
    </>)
  } else if (percentage < 50) {
    return(<>
    <div>
      <div className='text-red-600'>Failed</div>
    </div>
    </>)
  } else {
    return 'Unknown'
  }
}

const getAnimatedImage = (points:number, maxPoints:number) => {
  const examResult = getExamResult(points, maxPoints, true)
  if(examResult === 'Passed') {
    return (<img src="https://media.tenor.com/r1hf8zhfBskAAAAM/jerry-springer-talk.gif" alt='Meme' className='w-full mt-6'/>)
  } else if(examResult === 'Failed') {
    return (<img src="https://media.tenor.com/Ovl6WVOhOSMAAAAC/try-again.gif" alt='Meme' className='w-full mt-6'/>)
  } else {
    return (<img src="https://media.tenor.com/pQ7kmYSBiZIAAAAC/bkrafty-bkraftyerror.gif" alt='Meme' className='w-full mt-6'/>)
  }
}

const getResultTitle = (points:number, maxPoints:number) => {
  const examResult = getExamResult(points, maxPoints, true)

  const wrapper  = (text:string, statusClass:string)  => { 
    return (<div className={`text-xl sm:text-3xl flex items-center justify-center w-full min-h-[140px] font-bold text-slate-950 ${statusClass}`}>{text}</div>);
  }

  if(examResult === 'Passed') {
    return wrapper('You have completed the exam, congratulations! 🎉', 'bg-green-600')
  } else if(examResult === 'Failed') {
    return wrapper('Not this time bruv, try again!', 'bg-red-600')
  } else {
    return wrapper('Something is broken...</!', 'bg-blue-600')
  }

}

import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import {
  MdBrowseGallery,
  MdOutlineIncompleteCircle,
  MdContentCopy,
  MdOutlineDiamond,
  MdLocalFireDepartment,
  MdOutlineDateRange,
  MdIncompleteCircle,
  MdOutlineDownloadForOffline,
} from 'react-icons/md';
import toast from 'react-hot-toast';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
  Area,
  BarChart,
  Legend,
  Bar,
} from 'recharts';
import dayjs from 'dayjs';
import ReactPDF from '@react-pdf/renderer';
import Clipboard from 'react-clipboard.js';
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineClockCircle,
  AiFillGoogleCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { BsDiscord, BsPercent, BsMailbox, BsDownload } from 'react-icons/bs';
import { BiMailSend } from 'react-icons/bi';
import { FaRegCopy } from 'react-icons/fa';
interface UserAnswers {
  id: number;
  qId: string;
  result: number;
}

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
  userAnswers: UserAnswers[];
};
// TODO: Different messages for different results
// TODO: Different gif for different results
// TODO: Action buttons: Try again, Go to dashboard, Go to exam
// TODO: If not logged in show CTA to create account or log in

export default function ResultPopover({
  title,
  description,
  points,
  maxPoints,
  timeOut,
  answerCounter,
  examId,
  token,
  timeStarted,
  timeEnded,
  finalTime,
  userAnswers,
}: Props) {
  const wrong = maxPoints - points;
  const data = [
    { name: 'Correct', value: Number(points), color: 'green' },
    { name: 'Wrong', value: Number(wrong), color: 'red' },
  ];

  const totalTime = finalTime - timeStarted;
  const examGeneratedLink = `${window.location.hostname}/results/${examId}`;

  const toastSuccessCopied = () => toast.success('Copied to clipboard');

  return (
    <>
      <div className="flex items-center justify-center pb-12 sm:mx-4">
        <div className="min-h-3xl flex w-full flex-col items-center justify-center bg-slate-950/80 transition-all">
          <div className="min-h-full w-full max-w-full flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950 px-2 py-4 text-slate-300 sm:gap-4 sm:px-8 sm:py-4">
            <div className="flex items-center gap-4">
              <div> {getAnimatedImage(points, maxPoints)}</div>
              {getResultTitle(points, maxPoints)}
            </div>

            <div className="mt-2 flex flex-col sm:container sm:mt-6">
              <div className="flex flex-col justify-around gap-2 rounded-xl border border-slate-800 py-2 py-4 pl-4 text-xs sm:flex-row ">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Exam ID</span>
                  <span className="font-bold">{examId}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Time started</span>
                  <span className="font-bold">
                    {dayjs(timeStarted).format('H:m s/60')}
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className="font-bold">Time ended</span>
                  <span className="font-bold">
                    {dayjs(timeStarted + (timeEnded - timeStarted)).format(
                      'H:m s/60'
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className="font-bold">Final time</span>
                  <span className="font-bold">
                    {dayjs(finalTime).format('H:m s/60')}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex justify-around gap-4 rounded-xl border border-slate-800 py-4 py-8">
                <div className="flex flex-col items-center justify-center">
                  <BsPercent className="text-xl" />
                  <span className="text-xl font-bold  sm:text-3xl">
                    {Number((points / maxPoints) * 100).toPrecision(4)}{' '}
                  </span>
                </div>

                <div className="flex items-center text-4xl font-bold">
                  {getExamResult(points, maxPoints, false)}
                </div>

                <div className="grid grid-cols-5 items-center gap-2">
                  {/** List of all questions idicated by icons with color AiOutlineCheckCircle,AiOutlineClockCircle,AiOutlineCloseCircle  */}
                  {userAnswers.map((answer, iterator) => {
                    if (answer.result === 1) {
                      return (
                        <div
                          key={iterator}
                          className="flex flex-col items-center justify-center gap-2 text-green-500"
                        >
                          <AiOutlineCheckCircle className="text-xl" />
                          <span>{answer.id + 1}</span>
                        </div>
                      );
                    } else if (answer.result === 0) {
                      return (
                        <div
                          key={iterator}
                          className="flex flex-col items-center justify-center gap-2 text-red-500"
                        >
                          <AiOutlineCloseCircle className="text-xl" />
                          <span>{answer.id + 1}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={iterator}
                          className="flex flex-col items-center justify-center gap-2 text-yellow-500"
                        >
                          <AiOutlineClockCircle className="text-xl" />
                          <span>{answer.id + 1}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div className="mt-8 flex justify-around gap-4 rounded-xl border border-slate-800 py-4 py-8">
                <div className="flex flex-col items-center justify-center">
                  <MdBrowseGallery className="text-xl" />
                  <span className="text-xl font-bold  sm:text-3xl">
                    {dayjs(timeEnded - timeStarted).format('mm:ss')}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <MdIncompleteCircle className="text-xl" />
                  <span className="text-xl font-bold  sm:text-3xl">
                    {answerCounter}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <MdLocalFireDepartment className="text-xl" />
                  <span className="text-xl font-bold  sm:text-3xl">
                    {maxPoints}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <MdOutlineDiamond className="text-xl" />
                  <span className="text-xl font-bold  sm:text-3xl">
                    {points}
                  </span>
                </div>
              </div>

              <div className="mx-2 mt-6 flex flex flex-col items-center gap-4 xl:flex-row">
                <span>Share your results</span>

                <Clipboard
                  data-clipboard-text={examGeneratedLink}
                  onSuccess={toastSuccessCopied}
                >
                  <div className="flex w-full  items-center justify-between gap-2 rounded-xl border border-slate-900 bg-slate-900  px-4 py-2">
                    <div className="text-slate-500">{examGeneratedLink}</div>
                    <MdContentCopy className="cursor-pointer" />
                  </div>
                </Clipboard>
                <span>Follow our Social Media</span>
                <div className="flex flex-row gap-2 text-slate-800">
                  <a href="https://www.facebook.com/">
                    <AiFillFacebook className="cursor-pointer text-3xl transition-all hover:text-slate-50" />
                  </a>
                  <a href="https://www.instagram.com/">
                    <AiFillInstagram className="cursor-pointer text-3xl transition-all hover:text-slate-50" />
                  </a>
                  <a href="https://www.twitter.com/">
                    <AiFillTwitterSquare className="cursor-pointer text-3xl transition-all hover:text-slate-50" />
                  </a>
                  <a href="https://www.youtube.com/">
                    <AiFillYoutube className="cursor-pointer text-3xl transition-all hover:text-slate-50" />
                  </a>
                  <a href="https://www.discord.com/">
                    <BsDiscord className="cursor-pointer text-3xl transition-all hover:text-slate-50" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="ml-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-2 text-slate-800 transition-all hover:border-slate-50 hover:text-slate-50">
                    <span>Send</span>
                    <div>
                      <a href="https://www.gmail.com/">
                        <BiMailSend className="cursor-pointer text-2xl" />
                      </a>
                    </div>
                  </div>
                  <div className="ml-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-2 text-slate-800 transition-all hover:border-slate-50 hover:text-slate-50">
                    <span>Download</span>
                    <div>
                      <a href="https://www.gmail.com/">
                        <MdOutlineDownloadForOffline className="cursor-pointer text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>
            </div>

            <div className="mx-2 mt-6">
              <span>Statistics</span>
              <div className="flex flex-col gap-2 bg-slate-950 sm:flex-row sm:gap-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <BarChart
                    width={230}
                    height={250}
                    data={data}
                    className="hidden sm:flex"
                  >
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

                <div className="w-full">
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex justify-between gap-2 text-green-600">
                      <div>Correct</div>
                      <div className="font-bold">{points}</div>
                    </div>
                    <div className="flex justify-between gap-2 text-red-600">
                      <div>Wrong</div>
                      <div className="font-bold">{wrong}</div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-2 flex justify-between gap-2">
                      <div className="text-slate-300">Total</div>
                      <div className="font-bold">{maxPoints}</div>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-slate-700">
                    <div className="mt-2 flex justify-between gap-2">
                      <div className="text-slate-300">Final score</div>
                      <div className="font-bold">
                        {points}/{maxPoints}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between gap-2">
                      <div className="text-slate-300">Final result</div>
                      <div className="font-bold">
                        {getExamResult(points, maxPoints, false)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-slate-50"
                  onClick={() => {
                    // void ReactPDF.render(<ResultPopover />, `/example.pdf`);
                    console.log('Downloading');
                  }}
                >
                  Download results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getExamResult = (
  points: number,
  maxPoints: number,
  onlyStatus: boolean
) => {
  const percentage = (points / maxPoints) * 100;
  if (onlyStatus) {
    if (percentage >= 50) {
      return 'Passed';
    } else if (percentage < 50) {
      return 'Failed';
    } else {
      return 'Unknown';
    }
  }
  if (percentage >= 50) {
    return (
      <>
        <div>
          <div className="text-green-600">Passed</div>
        </div>
      </>
    );
  } else if (percentage < 50) {
    return (
      <>
        <div>
          <div className="text-red-600">Failed</div>
        </div>
      </>
    );
  } else {
    return 'Unknown';
  }
};

const getAnimatedImage = (points: number, maxPoints: number) => {
  const examResult = getExamResult(points, maxPoints, true);
  if (examResult === 'Passed') {
    return (
      <img
        src="https://media.tenor.com/r1hf8zhfBskAAAAM/jerry-springer-talk.gif"
        alt="Meme"
        className="mt-6 w-full"
      />
    );
  } else if (examResult === 'Failed') {
    return (
      <img
        src="https://media.tenor.com/Ovl6WVOhOSMAAAAC/try-again.gif"
        alt="Meme"
        className="mt-6 w-full"
      />
    );
  } else {
    return (
      <img
        src="https://media.tenor.com/pQ7kmYSBiZIAAAAC/bkrafty-bkraftyerror.gif"
        alt="Meme"
        className="mt-6 w-full"
      />
    );
  }
};

const getResultTitle = (points: number, maxPoints: number) => {
  const examResult = getExamResult(points, maxPoints, true);

  const wrapper = (text: string, statusClass: string) => {
    return (
      <div
        className={`flex min-h-[140px] w-full items-center justify-center text-xl font-bold text-slate-950 sm:text-3xl ${statusClass}`}
      >
        {text}
      </div>
    );
  };

  if (examResult === 'Passed') {
    return wrapper(
      'You have completed the exam, congratulations! 🎉',
      'bg-green-600'
    );
  } else if (examResult === 'Failed') {
    return wrapper('Not this time bruv, try again!', 'bg-red-600');
  } else {
    return wrapper('Something is broken...</!', 'bg-blue-600');
  }
};

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  MdBrowseGallery,
  MdLocalFireDepartment,
  MdOutlineDateRange,
  MdOutlineDiamond,
  MdOutlineIncompleteCircle,
} from 'react-icons/md';
import './StatsBar.module.css';

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
};

export default function StatsBar({
  answerCounter,
  maxAnswers,
  userPoints,
  progressPercent,
  timeStarted,
  pauseCountdown,
  timeEnded,
  duration,
}: Props) {
  const timeLeft = !pauseCountdown
    ? timeStarted + duration - Date.now()
    : timeEnded - timeStarted;

  return (
    <>
      <div className="stats fixed  bottom-0 left-0 z-50 flex w-full justify-center bg-slate-950">
        <div className="container flex items-center gap-4  rounded-xl border border-slate-900 p-4 text-xs text-slate-700 sm:gap-20 sm:text-sm">
          <div className="hidden w-24 items-center gap-2 sm:flex sm:w-64">
            <div>
              <MdOutlineDateRange className="text-xl" />
            </div>
            <p className="w-max text-slate-300">{`${dayjs(new Date()).format(
              'MM.DD.YYYY HH:m'
            )}`}</p>
          </div>
          <div className="flex w-24 w-fit items-center gap-2">
            <div>
              <MdBrowseGallery className="text-xl" />
            </div>
            <p className="w-max text-slate-300">{`${dayjs(timeLeft).format(
              'mm:ss'
            )}`}</p>
          </div>
          <div className="flex w-14  items-center gap-2">
            <div>
              <MdOutlineIncompleteCircle className="text-xl" />
            </div>
            <p className="text-slate-300">
              {answerCounter}/{maxAnswers}
            </p>
          </div>
          <div className="flex hidden w-14 items-center gap-2">
            <div>
              <MdLocalFireDepartment className="text-xl" />{' '}
            </div>
            <p className="text-slate-300">0</p>
          </div>
          <div className="flex w-12  items-center gap-2">
            <div>
              <MdOutlineDiamond className="text-xl" />{' '}
            </div>
            <p className="text-slate-300">{userPoints}</p>
          </div>

          <div className="flex w-full items-center gap-2 sm:gap-16">
            <div className="h-2.5 w-full rounded-full bg-gray-900 transition-all dark:bg-gray-700">
              <div
                className={`progressbar h-2.5 rounded-full bg-green-600 transition-all dark:bg-green-500`}
                style={{ width: `${Number(progressPercent.toFixed(0))}` + '%' }}
              ></div>
            </div>
            <div className="text-slate-400">
              {Number(progressPercent.toFixed(0))}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

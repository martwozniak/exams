import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import type { FormEvent, MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import LoadingIndicator from '~/components/LoadingIndicator/LoadingIndicator';
import { api } from '~/utils/api';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast from 'react-hot-toast';
import { MdReportProblem } from 'react-icons/md';
import ResultPopover from '~/components/ResultPopover/ResultPopover';
import StatsBar from '~/components/StatsBar/StatsBar';

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  // get answers related to question
  const questions = api.exam.getAllQuestionsAndAnswers.useQuery();

  const duration = 60 * 1 * 1000; // 1 minutes
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(0);
  const [finalTime, setFinalTime] = useState(Date.now() + duration);

  const [timeLeft, setTimeLeft] = useState(finalTime - Date.now());
  const timeOut = Number(timeLeft) < 0.0;

  const [pauseCountdown, setPauseCountdown] = useState(false);

  interface UserAnswers {
    id: number;
    qId: string;
    result: number;
    userAnswerId: string;
  }

  // Update time interval
  useEffect(() => {
    setInterval(() => {
      if (!pauseCountdown) {
        setTimeLeft(finalTime - Date.now());
      }
    }, 1000);
  }, []);

  const [examDuration, setExamDuration] = useState(duration);
  const [examToken, setExamToken] = useState('');

  const questionList = questions.data;

  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]); // {id: number, qId: string, result: number}[] = [];

  const [userPoints, setUserPoints] = useState(0);
  const [answerCounter, setAnswerCounter] = useState(0);
  const maxAnswers = questionList?.length;
  const [progressPercent, setProgressPercent] = useState(0.0);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examId, setExamId] = useState('');
  const answerToken = 'tkn';
  const router = useRouter();

  // use effect every second
  // TODO: Timeleft is not updating correctly
  // if current time == final time, then set examFinished to true
  if (finalTime == Date.now()) {
    setExamFinished(true);
  }

  // useEffect one time after site is loaded
  useEffect(() => {
    const examToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 19) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem('examToken', examToken);
    setExamToken(localStorage.getItem('examToken') || '');
    // starting time
    const setStartTime = dayjs();
  }, []);

  const IsCorrect = (
    id: string,
    isCorrect: boolean,
    qId: string,
    iterator: number
  ): MouseEventHandler<HTMLDivElement> | void | undefined => {
    const currentTag = 'input[name=' + qId + ']';
    const answers = document.querySelectorAll(currentTag);
    // if answer is not disabled, then add values
    const divId = 'div-' + id;
    const answerId = 'answer-' + id;
    const correctAnswer = document.getElementById(divId) as HTMLDivElement;
    const answersId = document.getElementById(answerId) as HTMLInputElement;

    if (!answersId.disabled) {
      const tempAnswerCounter = answerCounter + 1.0;
      const tempProgressPercent =
        (Number(tempAnswerCounter) / Number(maxAnswers)) * 100;
      setProgressPercent(tempProgressPercent);
      console.log(`Answer counter: ${Number(answerCounter)}`);
      console.log(`Max answers: ${Number(maxAnswers)}`);
      console.log(`Progress: ${progressPercent}%`);
      setAnswerCounter(tempAnswerCounter);

      if (tempProgressPercent == 100.0) {
        toast.success('You have completed the exam, congratulations! 🎉');
        // Show results
        setEndTime(Date.now());
        setExamFinished(true);
        setPauseCountdown(true);
        void router.push('#examResults');
      }
    }

    if (isCorrect == true) {
      if (answerId == null) return;

      if (correctAnswer?.classList.contains('bg-green-500')) {
        answersId.checked = false;
      } else {
        answersId.checked = true;
      }

      if (!answersId.disabled) {
        setUserPoints(userPoints + 1.0);
        correctAnswer?.classList.add('bg-green-500');
        setUserAnswers([
          ...userAnswers,
          { id: iterator, qId: qId, result: 1, userAnswerId: id },
        ]);
      }
    } else {
      if (!answersId.disabled && answersId != null) {
        answersId.checked = true;
        correctAnswer?.classList.add('bg-red-500');
        // find correct answer add green colo
        const correctAnswerId = `answer-${String(
          questions.data
            ?.find((q) => q.id == qId)
            ?.answers.find((a) => a.isCorrect == true)?.identifier
        )}`;
        const correctAnswerDivId = 'div-' + correctAnswerId;
        // const correctAnswerDiv = document.getElementById(correctAnswerDivId);
      }
      const correct = questionList
        ?.find((q) => q.id == qId)
        ?.answers.find((a) => a.isCorrect == true)?.identifier;

      const correctDiv = `div-${String(correct)}`;
      const corAns = document.getElementById(correctDiv);
      corAns?.classList.add('bg-green-500');
      (corAns as HTMLButtonElement).disabled = true;
      setUserAnswers([
        ...userAnswers,
        { id: iterator, qId: qId, result: 0, userAnswerId: id },
      ]);
    }
    // Disable other options
    answers.forEach((answer) => {
      (answer as HTMLButtonElement).disabled = true;
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault(); // Prevent form submission
    if (!event.target) return;
  };

  const { mutate, isLoading: isSendingQuestionIssueReport } =
    api.question.reportQuestionIssue.useMutation({
      onSuccess: () => {
        toast.success('Thank you for your feedback! 😊');
      },
      onError: () => {
        toast.error('Something went wrong, please try again later 😢');
      },
    });

  return (
    <>
      <Head>
        <title>
          Exams - prepare yourself for the hardest exams in your life
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex min-h-screen flex-col bg-slate-950 text-sm">
        <div className="blur-wrapper">
          <div className="hero flex items-center justify-center py-4 text-white">
            <div className="CTA-HERO mx-4 mt-0 text-slate-200 sm:mx-0 sm:mt-2">
              <h1 className="text-2xl font-bold sm:text-4xl xl:text-6xl">
                Begin your niskopoziomowe journey 😊
              </h1>
              <i>Make niskopoziomowe great again</i>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="container">
              <form className="formExam text-slate-50" onSubmit={handleSubmit}>
                {questions.isLoading ? (
                  <LoadingIndicator />
                ) : (
                  questionList?.map((q, iterator) => (
                    <div
                      key={q.id}
                      className="mx-4 my-4 rounded-xl border border-slate-800 px-4 py-4"
                    >
                      <div className="flex justify-between px-2 py-2">
                        <div>{q.body}</div>
                        <div
                          onClick={() => {
                            const issueReportResult = mutate({
                              reportedQuestionId: q.id,
                              token: examToken,
                            });
                          }}
                          className="cursor-pointer text-slate-900 transition-all hover:text-slate-500"
                        >
                          <MdReportProblem />
                        </div>
                      </div>
                      {/** If question iterator % 3 then show component with CTA convincing people to create account,
                       * if not then show question - include people who are not logging in, if person is loggin the not show it
                       * TODO: Conditional rendering for persons who are logged in and not logged in
                       * Logged In convince to spend more time on the website
                       * Not logged in convince to create account
                       */}
                      {q.answers.map((a) => (
                        <div
                          key={a.identifier}
                          onClick={() =>
                            IsCorrect(a.identifier, a.isCorrect, q.id, iterator)
                          }
                          id={`div-${a.identifier}`}
                          className="cursor-pointer  rounded-xl px-2 py-2 transition-all focus:text-white"
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={a.identifier}
                            id={`answer-${a.identifier}`}
                            className="mr-2 cursor-pointer"
                          />
                          <label
                            htmlFor={`answer-${a.identifier}`}
                            className="cursor-pointer"
                          >
                            {a.body}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </form>
              {examFinished ? (
                <div id="examResults">
                  <ResultPopover
                    title="Exam results"
                    description="You have completed the exam, congratulations! 🎉"
                    points={userPoints}
                    maxPoints={Number(maxAnswers)}
                    examId={examToken}
                    token={answerToken}
                    timeOut={true}
                    timeStarted={startTime}
                    timeEnded={endTime}
                    finalTime={finalTime}
                    answerCounter={answerCounter}
                    userAnswers={userAnswers}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <StatsBar
            timeStarted={startTime}
            userPoints={userPoints}
            maxAnswers={Number(maxAnswers)}
            progressPercent={progressPercent}
            answerCounter={answerCounter}
            timeOut={timeOut}
            pauseCountdown={pauseCountdown}
            timeEnded={endTime}
            finalTime={finalTime}
            duration={duration}
          />
        </div>
      </main>
    </>
  );
};
export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { examToken } = context.query;
//   const { data: exam } = await api.exam.getExam({
//     examId: examToken as string,
//   });
//   const { data: questions } = await api.question.getQuestions({
//     examId: examToken as string,
//   });
//   const { data: answers } = await api.answer.getAnswers({
//     examId: examToken as string,
//   });
//   const { data: userAnswers } = await api.answer.getUserAnswers({
//     examId: examToken as string,
//   });
//   const { data: user } = await api.user.getUser({
//     userId: exam?.userId as string,
//   });
//   const { data: userExam } = await api.user.getUserExam({
//     userId: exam?.userId as string,
//     examId: examToken as string,
//   });
//   const { data: userExamAnswers } = await api.user.getUserExamAnswers({
//     userId: exam?.userId as string,
//     examId: examToken as string,
//   });
//   const { data: userExamQuestions } = await api.user.getUserExamQuestions({
//     userId: exam?.userId as string,
//     examId: examToken as string,
//   });
//   const { data: userExamQuestionAnswers } =
//     await api.user.getUserExamQuestionAnswers({
//       userId: exam?.userId as string,
//       examId: examToken as string,
//     });
//   const { data: userExamQuestionAnswersCorrect } =
//     await api.user.getUserExamQuestionAnswersCorrect({
//       userId: exam?.userId as string,
//       examId: examToken as string,
//     });
//   const { data: userExamQuestionAnswersIncorrect } =
//     await api.user.getUserExamQuestionAnswersIncorrect({
//       userId: exam?.userId as string,
//       examId: examToken as string,
//     });
//   const { data: userExamQuestionAnswersNotAnswered } =
//     await api.user.getUserExamQuestionAnswersNotAnswered({
//       userId: exam?.userId as string,
//       examId: examToken as string,
//     });
//   }
//   return {
//     props: {
//       exam,
//       questions,
//       answers,
//       userAnswers,
//       user,
//       userExam,
//       userExamAnswers,
//       userExamQuestions,

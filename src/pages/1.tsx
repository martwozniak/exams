import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router'

import { api } from "~/utils/api";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import LoadingIndicator from "~/components/LoadingIndicator/LoadingIndicator";
import Image from "next/image";
import Header from "~/components/Header/Header";
import StatsBar from "~/components/StatsBar/StatsBar";
import toast from "react-hot-toast";
import { MdReportProblem } from "react-icons/md";
import ResultPopover from "~/components/ResultPopover/ResultPopover";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CTA from "~/components/CTA/CTA";

dayjs.extend(relativeTime);


const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // get answers related to question
  const questions = api.exam.getNQuestionsAndAnswers.useQuery(
    { numberOfQuestions: 1}
  );
  
  const exams = api.exam.getAllExams.useQuery();
  const duration = 60 * 1 * 1000; // 1 minutes
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(0);
  const [finalTime, setFinalTime] = useState(Date.now()+duration);

  const [timeLeft, setTimeLeft] = useState(finalTime-Date.now());
  const timeOut = (Number(timeLeft) < 0.0);
  //const [timeOut, setTimeOut] = useState(false);
  const [pauseCountdown, setPauseCountdown] = useState(false);
  // Update time interval

  useEffect(() => {
      setInterval(() => {
        if(!pauseCountdown){
          setTimeLeft(finalTime-Date.now())
      }}, 1000);
  }, []);

  const [examDuration, setExamDuration] = useState(duration);
  const [examToken, setExamToken] = useState("");

  const questionList = questions.data;

  const userAnswers = [
    
  ];

  const [userPoints, setUserPoints] = useState(0);
  const [answerCounter, setAnswerCounter] = useState(0);
  const maxAnswers = questionList?.length;
  const [progressPercent, setProgressPercent] = useState(0.0);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examId, setExamId] = useState(""); 
  const answerToken = "tkn";
  const router = useRouter()

  // use effect every second 
  // TODO: Timeleft is not updating correctly
  // if current time == final time, then set examFinished to true
  if(finalTime==Date.now()){  setExamFinished(true);}

  // useEffect one time after site is loaded
  useEffect(() => {
    const examToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 19)+ Math.random().toString(36).substring(2, 15);
    localStorage.setItem("examToken", examToken);
    setExamToken(localStorage.getItem("examToken") || "");
    // starting time
    const setStartTime = dayjs();


  }, []);


  const  IsCorrect = (id : string, isCorrect : boolean, qId: string) : (MouseEventHandler<HTMLDivElement> | void | undefined) => {

    const currentTag = "input[name="+qId+"]";
    const answers = document.querySelectorAll(currentTag);
    // if answer is not disabled, then add values
    const divId = "div-"+id;
    const answerId = "answer-"+id;
    const correctAnswer = document.getElementById(divId) as HTMLDivElement;
    const answersId = document.getElementById(answerId) as HTMLInputElement;

    if(!answersId.disabled){
      const tempAnswerCounter = answerCounter+1.0;
      const tempProgressPercent = (Number(tempAnswerCounter)/Number(maxAnswers))*100;
      setProgressPercent(tempProgressPercent);
      console.log(`Answer counter: ${Number(answerCounter)}`)
      console.log(`Max answers: ${Number(maxAnswers)}`)
      console.log(`Progress: ${progressPercent}%`)
      setAnswerCounter(tempAnswerCounter)

      if(tempProgressPercent == 100.0){
        toast.success("You have completed the exam, congratulations! 🎉");
        // Show results
        setEndTime(Date.now());
        setExamFinished(true);
        setPauseCountdown(true);
        void router.push("#examResults");
      }
    
    }
    

    if(isCorrect==true){
        if(answerId == null) return;

        if(correctAnswer?.classList.contains("bg-green-500")){
          answersId.checked = false;
        } else {
          answersId.checked = true;
        }
        
        if(!answersId.disabled) {
          setUserPoints(userPoints+1.0);
          correctAnswer?.classList.add("bg-green-500");
        }
    }else {
      //console.log("Incorrect answer")
  
        if(!answersId.disabled && answersId != null) { 
          answersId.checked = true;
          correctAnswer?.classList.add("bg-red-500");
          // find correct answer add green colo
          const correctAnswerId = `answer-${String(questions.data?.find((q) => q.id == qId)?.answers.find((a) => a.isCorrect == true)?.identifier)}`;
          const correctAnswerDivId = "div-"+correctAnswerId;
          const correctAnswerDiv = document.getElementById(correctAnswerDivId);
          
        }
        const correct = questionList?.find((q) => q.id == qId)?.answers.find((a) => a.isCorrect == true)?.identifier;
    
        const correctDiv = `div-${String(correct)}`;
        const corAns = document.getElementById(correctDiv);
        corAns?.classList.add("bg-green-500");
        (corAns as HTMLButtonElement).disabled = true;

    }
    // Disable other options
    answers.forEach((answer) => {
      (answer as HTMLButtonElement).disabled = true;
    } )
    
  };

  const handleSubmit = (event : (FormEvent)) : void =>  {
    event.preventDefault(); // Prevent form submission
    if (!event.target) return;
  };
  
  const { mutate, isLoading: isSendingQuestionIssueReport } = api.question.reportQuestionIssue.useMutation(
    {
      onSuccess : () => {
      toast.success("Thank you for your feedback! 😊");
    },
    onError : () => {
      toast.error("Something went wrong, please try again later 😢");
    }
  }
  );

  return (
    <>
      <Head>
        <title>Exams - prepare yourself for the hardest exams in your life</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-slate-950 text-sm main">
       <div className="blur-wrapper">

      
        <div className="hero flex items-center justify-center text-white py-4">
     
        <div className="CTA-HERO text-slate-200 mt-0 sm:mt-2 mx-4 sm:mx-0">
            <h1 className="text-2xl sm:text-6xl font-bold">Begin your niskopoziomowe journey 😊</h1>
            <i>Make niskopoziomowe great again</i>
        </div>
      
          </div>
          <div className="flex justify-center">
            <div className="container">
              <form className="formExam text-slate-50" onSubmit={handleSubmit}>
               
                {questions.isLoading ? <LoadingIndicator /> : questionList?.map((q) => (
                  <div key={q.id} className="px-4 py-4 border border-slate-800 rounded-xl my-4 mx-4">
                    <div className="px-2 py-2 flex justify-between">
                      <div>{q.body}</div>
                      <div onClick={ () => {
                        const issueReportResult = mutate({reportedQuestionId: q.id, token: examToken})
                      }} className="cursor-pointer text-slate-900 hover:text-slate-500 transition-all"><MdReportProblem/></div>
                    </div>
                    {q.answers.map((a) => (
                    <div key={a.identifier} onClick={
                      () => IsCorrect(a.identifier, a.isCorrect, q.id)
                    }  id={`div-${a.identifier}`} className="px-2  transition-all py-2 rounded-xl cursor-pointer focus:text-white">
                      <input type="radio" name={q.id} value={a.identifier} id={`answer-${a.identifier}`}  className="mr-2" />
                      <label htmlFor={`answer-${a.identifier}`}>{a.body}</label>
                    </div>
                  ))}

             
                  </div>
                  
                ))}
              
              </form>
              <div className="text-slate-50">
              <CTA/>

              </div>
              {examFinished ? " " : ""}
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

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import LoadingIndicator from "~/components/LoadingIndicator/LoadingIndicator";
import Image from "next/image";
import Header from "~/components/Header/Header";
import StatsBar from "~/components/StatsBar/StatsBar";
import toast from "react-hot-toast";
import { MdReportProblem } from "react-icons/md";
import ResultPopover from "~/components/ResultPopover/ResultPopover";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // get answers related to question
  const questions = api.exam.getAllQuestionsAndAnswers.useQuery();
  const exams = api.exam.getAllExams.useQuery();
  const duration = 60 * 1 * 1000; // 1 minutes
  const [startTime, setStartTime] = useState(Date.now()+duration);
  const [nowTime, setNowTime] = useState(Date.now());
  const timeLeft = (startTime - nowTime).toLocaleString();
  const timeOut = (Number(timeLeft) < 0.0) 

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => setNowTime(Date.now()), 1000);
    return () => {
      if(!timeOut){
        clearInterval(interval);
      }
    };
  }, []);

  const questionList = questions.data;
  console.log(questions?.data)
  //console.log(exams.isSuccess)
  //console.log(questions.isSuccess)
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   //console.log(event.target[0].value)
  // }
  const userAnswers = [
    
  ];
  // Set start timer time to now + 30 minutes

  const [userPoints, setUserPoints] = useState(0);
  const [answerCounter, setAnswerCounter] = useState(0);
  const maxAnswers = questionList?.length;
  const [progressPercent, setProgressPercent] = useState(0.0);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examId, setExamId] = useState(""); 
  const answerToken = "tkn";

  const  IsCorrect = (id : string, isCorrect : boolean, qId: string) : (MouseEventHandler<HTMLDivElement> | void | undefined) => {
    console.log(id)
    console.log(isCorrect)


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
        setExamFinished(true);
      }
    
    }
    

    if(isCorrect==true){
      console.log("Correct answer")


        if(answerId == null) return;

        console.log(correctAnswer?.classList)
        // check if have class bg-green-500
        if(correctAnswer?.classList.contains("bg-green-500")){
          answersId.checked = false;
        } else {
          answersId.checked = true;
        }
        
        // if input field are disabled, then do not add points
        if(!answersId.disabled) {
          setUserPoints(userPoints+1.0);
          correctAnswer?.classList.add("bg-green-500");
        }
    }else {
      console.log("Incorrect answer")
  
        if(!answersId.disabled && answersId != null) { 
          answersId.checked = true;
          correctAnswer?.classList.add("bg-red-500");
          // find correct answer add green colo
          const correctAnswerId = `answer-${String(questions.data?.find((q) => q.id == qId)?.answers.find((a) => a.isCorrect == true)?.identifier)}`;
          const correctAnswerDivId = "div-"+correctAnswerId;
          const correctAnswerDiv = document.getElementById(correctAnswerDivId);
          
        }
        // find correct answer add green color
        const correct = questionList?.find((q) => q.id == qId)?.answers.find((a) => a.isCorrect == true)?.identifier;
    
        const correctDiv = `div-${String(correct)}`;
        const corAns = document.getElementById(correctDiv);
        corAns?.classList.add("bg-green-500");
        (corAns as HTMLButtonElement).disabled = true;
        // setAnswerCounter(anserCounter+1.0)
        // setProgressPercent((anserCounter/maxAnswers)*100);
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


  return (
    <>
      <Head>
        <title>Exams - prepare yourself for the hardest exams in your life</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-slate-950 text-sm main">
       
      <Header/>
      
        <div className="hero flex items-center justify-center text-whit py-4">
        <div className="CTA-HERO text-slate-200 mt-24">
            <h1 className="text-6xl font-bold">Begin your niskopoziomowe journey 😊</h1>
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
                        toast("Zgloszono pytanie do moderacji")
                      }} className="cursor-pointer text-slate-900 hover:text-slate-500 transition-all"><MdReportProblem/></div>
                    </div>
                    {q.answers.map((a) => (
                    <div key={a.identifier} onClick={
                      () => IsCorrect(a.identifier, a.isCorrect, q.id)
                    }  id={`div-${a.identifier}`} className="px-2 py-2 rounded-xl">
                      <input type="radio" name={q.id} value={a.identifier} id={`answer-${a.identifier}`}  className="mr-2" />
                      <label htmlFor={`answer-${a.identifier}`}>{a.body}</label>
                    </div>
                  ))}

             
                  </div>
                  
                ))}
                <button className="bg-slate-900 text-slate-50 px-4 py-2 rounded-xl mt-4 mx-4" >Check your answers</button>
              </form>
            </div>
          </div>
          {examFinished ? <ResultPopover 
              title="Exam results"
              description="You have completed the exam, congratulations! 🎉"
              points={userPoints}
              maxPoints={Number(maxAnswers)}
              examId={examId}
              token={answerToken}
              timeLeft="0"
              timeOut={true}
              answerCounter={answerCounter}
              /> : <></>
              }
          <StatsBar
            timeLeft={timeLeft}
            userPoints={userPoints}
            maxAnswers={Number(maxAnswers)}
            progressPercent={progressPercent}
            answerCounter={answerCounter}
            timeOut={timeOut}
          />
      </main>
    </>
  );
};

export default Home;

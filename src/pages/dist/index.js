"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var head_1 = require("next/head");
var router_1 = require("next/router");
var react_1 = require("react");
var LoadingIndicator_1 = require("~/components/LoadingIndicator/LoadingIndicator");
var api_1 = require("~/utils/api");
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
var react_hot_toast_1 = require("react-hot-toast");
var md_1 = require("react-icons/md");
var ResultPopover_1 = require("~/components/ResultPopover/ResultPopover");
var StatsBar_1 = require("~/components/StatsBar/StatsBar");
dayjs_1["default"].extend(relativeTime_1["default"]);
var Home = function (_a) {
    var serverStartTime = _a.serverStartTime;
    var startTime = serverStartTime;
    // get answers related to question
    var questions = api_1.api.exam.getAllQuestionsAndAnswers.useQuery();
    var duration = 60 * 1 * 1000; // 1 minutes
    // const [startTime, setStartTime] = useState(Date.now());
    var _b = react_1.useState(0), endTime = _b[0], setEndTime = _b[1];
    var _c = react_1.useState(Date.now() + duration), finalTime = _c[0], setFinalTime = _c[1];
    var _d = react_1.useState(finalTime - Date.now()), timeLeft = _d[0], setTimeLeft = _d[1];
    var timeOut = Number(timeLeft) < 0.0;
    var _e = react_1.useState(false), pauseCountdown = _e[0], setPauseCountdown = _e[1];
    // Update time interval
    react_1.useEffect(function () {
        setInterval(function () {
            if (!pauseCountdown) {
                setTimeLeft(finalTime - Date.now());
            }
        }, 1000);
    }, []);
    var _f = react_1.useState(duration), examDuration = _f[0], setExamDuration = _f[1];
    var _g = react_1.useState(''), examToken = _g[0], setExamToken = _g[1];
    var questionList = questions.data;
    var _h = react_1.useState([]), userAnswers = _h[0], setUserAnswers = _h[1]; // {id: number, qId: string, result: number}[] = [];
    var _j = react_1.useState(0), userPoints = _j[0], setUserPoints = _j[1];
    var _k = react_1.useState(0), answerCounter = _k[0], setAnswerCounter = _k[1];
    var maxAnswers = questionList === null || questionList === void 0 ? void 0 : questionList.length;
    var _l = react_1.useState(0.0), progressPercent = _l[0], setProgressPercent = _l[1];
    var _m = react_1.useState(false), examStarted = _m[0], setExamStarted = _m[1];
    var _o = react_1.useState(false), examFinished = _o[0], setExamFinished = _o[1];
    var _p = react_1.useState(''), examId = _p[0], setExamId = _p[1];
    var answerToken = 'tkn';
    var router = router_1.useRouter();
    // use effect every second
    // TODO: Timeleft is not updating correctly
    // if current time == final time, then set examFinished to true
    if (finalTime == Date.now()) {
        setExamFinished(true);
    }
    // useEffect one time after site is loaded
    react_1.useEffect(function () {
        var examToken = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 19) +
            Math.random().toString(36).substring(2, 15);
        localStorage.setItem('examToken', examToken);
        setExamToken(localStorage.getItem('examToken') || '');
    }, []);
    var IsCorrect = function (id, isCorrect, qId, iterator) {
        var _a, _b, _c, _d, _e;
        var currentTag = 'input[name=' + qId + ']';
        var answers = document.querySelectorAll(currentTag);
        // if answer is not disabled, then add values
        var divId = 'div-' + id;
        var answerId = 'answer-' + id;
        var correctAnswer = document.getElementById(divId);
        var answersId = document.getElementById(answerId);
        if (!answersId.disabled) {
            var tempAnswerCounter = answerCounter + 1.0;
            var tempProgressPercent = (Number(tempAnswerCounter) / Number(maxAnswers)) * 100;
            setProgressPercent(tempProgressPercent);
            console.log("Answer counter: " + Number(answerCounter));
            console.log("Max answers: " + Number(maxAnswers));
            console.log("Progress: " + progressPercent + "%");
            setAnswerCounter(tempAnswerCounter);
            if (tempProgressPercent == 100.0) {
                react_hot_toast_1["default"].success('You have completed the exam, congratulations! 🎉');
                // Show results
                setEndTime(Date.now());
                setExamFinished(true);
                setPauseCountdown(true);
                void router.push('#examResults');
            }
        }
        if (isCorrect == true) {
            if (answerId == null)
                return;
            if (correctAnswer === null || correctAnswer === void 0 ? void 0 : correctAnswer.classList.contains('bg-green-500')) {
                answersId.checked = false;
            }
            else {
                answersId.checked = true;
            }
            if (!answersId.disabled) {
                setUserPoints(userPoints + 1.0);
                correctAnswer === null || correctAnswer === void 0 ? void 0 : correctAnswer.classList.add('bg-green-500');
                setUserAnswers(__spreadArrays(userAnswers, [
                    { id: iterator, qId: qId, result: 1, userAnswerId: id },
                ]));
            }
        }
        else {
            if (!answersId.disabled && answersId != null) {
                answersId.checked = true;
                correctAnswer === null || correctAnswer === void 0 ? void 0 : correctAnswer.classList.add('bg-red-500');
                // find correct answer add green colo
                var correctAnswerId = "answer-" + String((_c = (_b = (_a = questions.data) === null || _a === void 0 ? void 0 : _a.find(function (q) { return q.id == qId; })) === null || _b === void 0 ? void 0 : _b.answers.find(function (a) { return a.isCorrect == true; })) === null || _c === void 0 ? void 0 : _c.identifier);
                var correctAnswerDivId = 'div-' + correctAnswerId;
                // const correctAnswerDiv = document.getElementById(correctAnswerDivId);
            }
            var correct = (_e = (_d = questionList === null || questionList === void 0 ? void 0 : questionList.find(function (q) { return q.id == qId; })) === null || _d === void 0 ? void 0 : _d.answers.find(function (a) { return a.isCorrect == true; })) === null || _e === void 0 ? void 0 : _e.identifier;
            var correctDiv = "div-" + String(correct);
            var corAns = document.getElementById(correctDiv);
            corAns === null || corAns === void 0 ? void 0 : corAns.classList.add('bg-green-500');
            corAns.disabled = true;
            setUserAnswers(__spreadArrays(userAnswers, [
                { id: iterator, qId: qId, result: 0, userAnswerId: id },
            ]));
        }
        // Disable other options
        answers.forEach(function (answer) {
            answer.disabled = true;
        });
    };
    var handleSubmit = function (event) {
        event.preventDefault(); // Prevent form submission
        if (!event.target)
            return;
    };
    var _q = api_1.api.question.reportQuestionIssue.useMutation({
        onSuccess: function () {
            react_hot_toast_1["default"].success('Thank you for your feedback! 😊');
        },
        onError: function () {
            react_hot_toast_1["default"].error('Something went wrong, please try again later 😢');
        }
    }), mutate = _q.mutate, isSendingQuestionIssueReport = _q.isLoading;
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Exams - prepare yourself for the hardest exams in your life"),
            React.createElement("meta", { name: "description", content: "Generated by create-t3-app" }),
            React.createElement("link", { rel: "icon", href: "/favicon.ico" })),
        React.createElement("main", { className: "main flex min-h-screen flex-col bg-slate-950 text-sm" },
            React.createElement("div", { className: "blur-wrapper" },
                React.createElement("div", { className: "hero flex items-center justify-center py-4 text-white" },
                    React.createElement("div", { className: "CTA-HERO mx-4 mt-0 text-slate-200 sm:mx-0 sm:mt-2" },
                        React.createElement("h1", { className: "text-2xl font-bold sm:text-4xl xl:text-6xl" }, "Begin your niskopoziomowe journey \uD83D\uDE0A"),
                        React.createElement("i", null, "Make niskopoziomowe great again"))),
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement("div", { className: "container" },
                        React.createElement("form", { className: "formExam text-slate-50", onSubmit: handleSubmit }, questions.isLoading ? (React.createElement(LoadingIndicator_1["default"], null)) : (questionList === null || questionList === void 0 ? void 0 : questionList.map(function (q, iterator) { return (React.createElement("div", { key: q.id, className: "mx-4 my-4 rounded-xl border border-slate-800 px-4 py-4" },
                            React.createElement("div", { className: "flex justify-between px-2 py-2" },
                                React.createElement("div", null, q.body),
                                React.createElement("div", { onClick: function () {
                                        var issueReportResult = mutate({
                                            reportedQuestionId: q.id,
                                            token: examToken
                                        });
                                    }, className: "cursor-pointer text-slate-900 transition-all hover:text-slate-500" },
                                    React.createElement(md_1.MdReportProblem, null))),
                            q.answers.map(function (a) { return (React.createElement("div", { key: a.identifier, onClick: function () {
                                    return IsCorrect(a.identifier, a.isCorrect, q.id, iterator);
                                }, id: "div-" + a.identifier, className: "cursor-pointer  rounded-xl px-2 py-2 transition-all focus:text-white" },
                                React.createElement("input", { type: "radio", name: q.id, value: a.identifier, id: "answer-" + a.identifier, className: "mr-2 cursor-pointer" }),
                                React.createElement("label", { htmlFor: "answer-" + a.identifier, className: "cursor-pointer" }, a.body))); }))); }))),
                        examFinished ? (React.createElement("div", { id: "examResults" },
                            React.createElement(ResultPopover_1["default"], { title: "Exam results", description: "You have completed the exam, congratulations! \uD83C\uDF89", points: userPoints, maxPoints: Number(maxAnswers), examId: examToken, token: answerToken, timeOut: true, timeStarted: startTime, timeEnded: endTime, finalTime: finalTime, answerCounter: answerCounter, userAnswers: userAnswers }))) : (''))),
                React.createElement(StatsBar_1["default"], { timeStarted: startTime, userPoints: userPoints, maxAnswers: Number(maxAnswers), progressPercent: progressPercent, answerCounter: answerCounter, timeOut: timeOut, pauseCountdown: pauseCountdown, timeEnded: endTime, finalTime: finalTime, duration: duration })))));
};
exports["default"] = Home;
function getServerSideProps(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var simulate, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1); })];
                case 1:
                    simulate = _a.sent();
                    session = 1;
                    // if (!session) {
                    //   return {
                    //     redirect: {
                    //       destination: '/',
                    //       permanent: false,
                    //     },
                    //   };
                    // }
                    return [2 /*return*/, {
                            props: {
                                serverStartTime: Date.now()
                            }
                        }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;

import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./helpers/Loader";
import Error from "./helpers/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";
import Footer from "./Components/Footer";
import NextButton from "./Components/NextButton";

const initialState = {
  questions: [],
  // # "loading" , "error" , "ready" , "active" , "finished"  ---- Status of the page of quiz
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // TODO : access the current question to collect points if correct
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: initialState.answer, index: state.index + 1 };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("ERROR : ACTION NOT FOUND");
  }
}
function App() {
  // ! Accessing the values of the state of the Reducer to use it around the app
  // * Destructuring from the state object
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // variables in use
  const noOfQuestions = questions.length;
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const totalPossiblePOints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={noOfQuestions} dispatchFunc={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestion={noOfQuestions}
              points={points}
              maxPoints={totalPossiblePOints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatchFunc={dispatch}
              answer={answer}
            />{" "}
            <Footer>
              <Timer
                dispatchFunc={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatchFunc={dispatch}
                numQuestions={noOfQuestions}
                answer={answer}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={totalPossiblePOints}
            highScore={highScore}
            dispatchFunc={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

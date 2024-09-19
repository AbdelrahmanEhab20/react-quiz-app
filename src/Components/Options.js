import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((singleOption, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          key={singleOption}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {singleOption}
        </button>
      ))}
    </div>
  );
}

export default Options;

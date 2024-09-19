function Options({ question, dispatchFunc, answer }) {
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
          onClick={() => dispatchFunc({ type: "newAnswer", payload: index })}
        >
          {singleOption}
        </button>
      ))}
    </div>
  );
}

export default Options;

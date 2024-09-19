function NextButton({ dispatchFunc, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatchFunc({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatchFunc({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;

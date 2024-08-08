import Options from "./Options";

function Question({ question, dispatchFunc, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatchFunc={dispatchFunc}
        answer={answer}
      />
    </div>
  );
}

export default Question;

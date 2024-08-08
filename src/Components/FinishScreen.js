function FinishScreen({ points, maxPoints, highScore, dispatchFunc }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> with Percentage{" "}
        <strong>{Math.ceil(percentage)} %</strong>
      </p>
      <p className="highscore">
        ( Highscore : <strong>{highScore} </strong>Points )
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatchFunc({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;

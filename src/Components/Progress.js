function Progress({ index, numberOfQuestion, points, maxPoints ,answer}) {
  return (
    <header className="progress">
      <progress max={numberOfQuestion} value={index+Number(answer!==null)} />
      <p>
        Question <strong>{index}</strong> / {numberOfQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;

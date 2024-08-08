function StartScreen({ questionsNumber = 0 }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz !</h2>
      <h3>{questionsNumber} questions to test your react mastery</h3>
      <button className="btn" onClick={() => {}}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;

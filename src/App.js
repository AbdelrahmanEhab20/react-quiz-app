import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";

const initialState = {
  questions: [],
  // # "loading" , "error" , "ready" , "active" , "finished"  ---- Status of the page of quiz
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "failed":
      return { ...state, status: "error" };
    default:
      throw new Error("ERROR : ACTION NOT FOUND");
  }
}
function App() {
  const [state, dispatch] = useReducer(initialState, reducer);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "failed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/5</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;

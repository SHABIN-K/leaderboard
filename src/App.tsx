import { useEffect } from "react";
import "./App.css";
import { generateConfetti } from "./utils/generateConfetti";

function App() {
  useEffect(() => {
    generateConfetti();
  }, []);

  return (
    <>
      <h1>hello world</h1>
    </>
  );
}

export default App;

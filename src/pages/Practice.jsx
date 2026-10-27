import questionBank from "../data/all_questions_with_desmos";
import "./Practice.css";
import DesmosCalculator from "../components/DesmosCalculator";
import { useState } from "react";

const questions = questionBank.questions.map((q) => ({
  id: q.id,
  category: q.topic,
  difficulty: "Unspecified",
  prompt: q.question,
  acceptedAnswers: [String(q.answer)],
  feedback: "Try again.",
  solutionSteps:[],
  desmosSolution: q.desmosSolution
}));

function Practice() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const question = questions[questionIndex];

  function normalizeAnswer(value) {
    return value
      .trim()
      .replace(/\s/g, "")
      .toLowerCase();
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const submitted = normalizeAnswer(answer);
    const accepted = question.acceptedAnswers.map(normalizeAnswer);

    const correct = accepted.includes(submitted);

    setFeedback({
      correct,
      message: correct ? "Correct" : "Incorrect",
    });
  }
  function nextQuestion() {
    setQuestionIndex((previousIndex) =>
    (previousIndex + 1) % questions.length
  );


  setShowExplanation(false);
  setAnswer("");
  setFeedback(null);
  }
  function showDesmosSolution() {
    setShowExplanation(true);  
  }
  return (
    <main className="practice">
      <h1 className="practice-title">Regress</h1>
      <p>Question {questionIndex + 1} of {questions.length} </p>
      <div className="practice-layout">
        <section className="calculator">
          <DesmosCalculator />
        </section>
        <section className="question">
          <h2>{question.category}</h2>
          <p className="question-prompt">{question.prompt}</p>
          <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setFeedback(null);
            }}
            placeholder="Enter answer"
            required
            />
            <button className="submit-button" type="submit">Submit</button>
          </form>
          {feedback && (
            <p className={feedback.correct ? "correct" : "incorrect"}>{feedback.message}</p>
          )}
          <button className="next-button" onClick={nextQuestion}>Next Question</button>
          <button type="button" onClick={showDesmosSolution}>Show Desmos Solution</button>
          {showExplanation && (<p className="solution-explanation">{question.desmosSolution?.explanation}</p>)}
        </section>
      </div>
    </main>
  );
} 

export default Practice;
import React from 'react';

export default function SortingHatQuestions({ currentQuestion, onAnswer }) {
  return (
    <>
      <h2>{currentQuestion.question}</h2>
      <div className="questionContainer">
        <button onClick={() => onAnswer(currentQuestion.gryffindorChoice)}>
          {currentQuestion.gryffindorChoice}
        </button>
        <button onClick={() => onAnswer(currentQuestion.slytherinChoice)}>
          {currentQuestion.slytherinChoice}
        </button>
        <button onClick={() => onAnswer(currentQuestion.hufflepuffChoice)}>
          {currentQuestion.ravenclawChoice}
        </button>
        <button onClick={() => onAnswer(currentQuestion.ravenclawChoice)}>
          {currentQuestion.hufflepuffChoice}
        </button>
      </div>
    </>
  );
}

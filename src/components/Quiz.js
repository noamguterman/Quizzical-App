import React from "react"
import Question from "./Question"

export default function Quiz({
  questions,
  checkAnswer,
  userAnswers,
  showResults,
}) {
  if (!questions) return null
  return (
    <>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          checkAnswer={checkAnswer}
          userAnswer={userAnswers[question.id]}
          showResults={showResults}
        />
      ))}
    </>
  )
}

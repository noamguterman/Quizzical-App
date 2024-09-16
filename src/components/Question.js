import React, { useMemo } from "react"

export default function Question({
  question,
  checkAnswer,
  userAnswer,
  showResults,
}) {
  const allAnswers = useMemo(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer]
    for (let i = 0; i < shuffled.length; i++) {
      const j = Math.floor(Math.random() * shuffled.length);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [question])

  return (
    <div>
      <p className="question">{question.question}</p>
      <div className="answersContainer">
        {allAnswers.map((answer, index) => {
          let answerClass = "answer"

          if (userAnswer === answer) {
            answerClass += " selected"
          } else if (showResults) {
            answerClass += " unselected"
          }

          if (showResults) {
            if (answer === question.correct_answer) {
              answerClass += " correct-answer"
            } else if (
              answer === userAnswer &&
              userAnswer !== question.correct_answer
            ) {
              answerClass += " wrong-answer"
            }

            answerClass += " disabled"
          }

          return (
            <span
              key={index}
              className={answerClass}
              onClick={() => {
                if (!showResults) {
                  checkAnswer(question.id, answer)
                }
              }}
            >
              {answer}
            </span>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

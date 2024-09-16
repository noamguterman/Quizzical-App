import React, { useState, useEffect } from "react"
import { getQuestionsData } from "./services"
import { decode } from "html-entities"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
import "./style.css"

export default function App() {
  const [welcomeScreen, setWelcomeScreen] = useState(true)
  const [allQuestions, setAllQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [loading, setLoading] = useState(false)

  function checkAnswer(questionId, answer) {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }))
  }

  function handleCheckAnswers() {
    let correctCount = 0

    allQuestions.forEach((question) => {
      const userAnswer = userAnswers[question.id]
      if (userAnswer === question.correct_answer) {
        correctCount++
      }
    })

    setCorrectAnswersCount(correctCount)
    setShowResults(true)
  }

  function startQuiz() {
    setWelcomeScreen(false)
  }

  async function decodeQuestions(questions) {
    setAllQuestions(
      questions.map((question, index) => ({
        id: index,
        question: decode(question.question),
        correct_answer: decode(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decode),
      }))
    )
  }

  async function fetchQuestions() {
    setLoading(true)
    while (true) {
      const questionsData = await getQuestionsData()
      if (questionsData) {
        await decodeQuestions(questionsData)
        break
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  function handlePlayAgain() {
    setUserAnswers({})
    setShowResults(false)
    setCorrectAnswersCount(0)
    setAllQuestions([])
    fetchQuestions()
  }

  const allAnswered =
    allQuestions.length > 0 &&
    Object.keys(userAnswers).length === allQuestions.length

  if (welcomeScreen) {
    return <Welcome startQuiz={startQuiz} />
  }

  if (loading) {
    return <div>Loading questions...</div>
  }

  return (
    <div>
      <Quiz
        questions={allQuestions}
        checkAnswer={checkAnswer}
        userAnswers={userAnswers}
        showResults={showResults}
      />
      {allAnswered && !showResults && (
        <div className="checkAnswersContainer">
          <button className="checkAnswersBtn" onClick={handleCheckAnswers}>
            Check Answers
          </button>
        </div>
      )}
      {showResults && (
        <div className="resultsContainer">
          <h3>
            You got {correctAnswersCount} out of {allQuestions.length} correct!
          </h3>
          <button className="playAgainBtn" onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  )
}

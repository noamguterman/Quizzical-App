import React from "react"

export default function Welcome({ startQuiz }) {
  return (
    <div className="welcomeContainer">
      <h1 className="welcome--title">Quizzical</h1>
      <p className="welcome--text">
        Welcome to Quizzical!
        <br />
        Tap the button to begin.
      </p>
      <button className="welcome--button" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  )
}

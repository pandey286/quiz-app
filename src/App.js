import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Questionaire from './components/Questionaire';

// const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
const API_URL = "https://the-trivia-api.com/api/questions";

function App() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    Axios.get(API_URL)
      .then(res => res.data)
      .then(data => {
        // const questions = data.results.map((question) => ({
        const questions = data.map((question) => ({
          ...question,
          // answers:[question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
          answers: [question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5)
        }))
        setQuestions(questions)
      });
  }, [])


  const handleAnswer = (answer) => {
    if (!showAnswers) {
      // if(answer === questions[currentIndex].correct_answer){
      if (answer === questions[currentIndex].correctAnswer) {
        setScore(score + 1);
      }
    }


    setShowAnswers(true);

  }

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  }

  const handlePrevQuestion = () => {
    setCurrentIndex(currentIndex - 1);
    setShowAnswers(true);
  }


  return (questions.length > 0 ? (
   
      <div className="container">
        <Header />
        {currentIndex >= questions.length ? (
          <div>
            <h1>Game Ended, Your Score is {score}</h1>
            <div className='score-gif'>
              {
                score > 7 ? <iframe src="https://gifer.com/embed/S5q" width="480" height="480"/>
                : 
                <iFrame src="https://gifer.com/embed/F1oX" width="480" height="309.474" />
              } 

            </div>

          </div>) : (<Questionaire handleAnswer={handleAnswer}
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            data={questions[currentIndex]}
            handlePrevQuestion={handlePrevQuestion}
          />)}
      </div>
    
  ) : <div className="container">Loading...</div>

  );
}

export default App;
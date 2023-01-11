import React from 'react'

// function Questionaire({handleAnswer,showAnswers,handleNextQuestion, data:{question, correct_answer, answers}}) {
function Questionaire({ handleAnswer, showAnswers, handleNextQuestion, handlePrevQuestion, data: { question, correctAnswer, answers } }) {
    return (
        <>
            <div className="questionClass">
                <h1 dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className="button-overall">
                {answers.map((answer, idx) => {
                    console.log(correctAnswer)
                    const specialClassName = showAnswers ? (
                        // answer === correct_answer ? "green-button": "red-button"
                        answer === correctAnswer ? "green-button" : "red-button"
                    ) : "";
                    return (
                        <button className={`normal-button ${specialClassName}`}
                            onClick={() => handleAnswer(answer)}
                            dangerouslySetInnerHTML={{ __html: answer }} />

                    )
                })}
            </div>
            <div>
            <button onClick={handleNextQuestion} className="next-question">Next Question</button>
            <button onClick={handlePrevQuestion} className="prev-question">Previous Question</button>
            </div>
        </>
    )
}

export default Questionaire
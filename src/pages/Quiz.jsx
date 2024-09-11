import { useState, useEffect } from 'react'
import supabase from '../services/supabaseClient'

const Quiz = ({ questions_sub_topics_id }) => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            console.log('Fetching questions for ID:', questions_sub_topics_id) // Debug log for the ID
            const { data, error } = await supabase
                .from('questions_with_answers')
                .select('questions')
                .eq('questions_sub_topics_id', questions_sub_topics_id)

            if (error) {
                console.error('Error fetching questions:', error)
            } else {
                console.log('Fetched data:', data) // Debug log for fetched data
                if (data && data.length > 0) {
                    // Assuming each entry in `data` has a `questions` field, which is an array of questions
                    const allQuestions = data.map((entry) => entry.questions)
                    setQuestions(allQuestions.flat()) // Flatten the array in case of multiple entries
                    console.log('Questions:', allQuestions.flat()) // Debug log for questions
                } else {
                    console.log('No questions found for this ID')
                }
            }
        }

        if (questions_sub_topics_id) {
            fetchQuestions()
        }
    }, [questions_sub_topics_id])

    const handleAnswerClick = (answer) => {
        if (answer.score === 1) {
            setScore(score + 1)
        }
        setSelectedAnswer(answer.text)
        setTimeout(() => {
            setSelectedAnswer(null)
            setCurrentQuestion(currentQuestion + 1)
        }, 1000) // Show the selected answer for a short time before moving to the next question
    }

    console.log('Current questions state:', questions) // Debug log for the current state of questions

    const question = questions[currentQuestion]

    return (
        <div className="quiz-container p-4">
            {questions.length === 0 ? (
                <p>Loading questions...</p>
            ) : (
                question && (
                    <div className="question-container">
                        <h2 className="question-text text-xl font-bold mb-4">
                            {question.questionText}
                        </h2>
                        <div className="answers-container">
                            {question.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`answer-button p-2 mb-2 w-full text-left ${
                                        selectedAnswer === answer.text
                                            ? 'bg-gray-300'
                                            : 'bg-blue-500'
                                    } text-white rounded`}
                                    onClick={() => handleAnswerClick(answer)}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                        {selectedAnswer && (
                            <p className="feedback-text mt-4">
                                You selected: {selectedAnswer}
                            </p>
                        )}
                    </div>
                )
            )}

            {currentQuestion >= questions.length && (
                <div className="result-container">
                    <h2 className="result-text text-xl font-bold">
                        Quiz Completed!
                    </h2>
                    <p className="score-text">
                        Your score: {score} out of {questions.length}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Quiz

import { useState, useEffect } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'

const Quiz = ({ questions_sub_topics_id, topic_name, root_href }) => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('questions_with_answers')
                .select('questions')
                .eq('questions_sub_topics_id', questions_sub_topics_id)

            if (error) {
                console.error('Error fetching questions:', error)
            } else {
                if (data && data.length > 0) {
                    const allQuestions = data.map((entry) => entry.questions)
                    setQuestions(allQuestions.flat())
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
        setSelectedAnswer(answer.text)
        setShowCorrectAnswer(true)

        if (answer.score === 1) {
            setScore(score + 1)
        }

        setTimeout(() => {
            setSelectedAnswer(null)
            setShowCorrectAnswer(false)
            setCurrentQuestion(currentQuestion + 1)
        }, 2000)
    }

    const question = questions[currentQuestion]

    return (
        <div className="quiz-container p-4 flex flex-col items-start">
            {questions.length === 0 ? (
                <p>Lädt fragen ...</p>
            ) : (
                question && (
                    <div className="question-answer-section space-y-6 w-full">
                        {/* Question Section */}
                        <div className="question-container bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="question-text text-xl text-black font-light text-center items-center mb-4">
                                {question.questionText}
                            </h2>
                        </div>

                        {/* Answer Section */}
                        <div className="answers-container grid grid-cols-1 gap-4 w-full">
                            {question.answers.map((answer, index) => {
                                const isCorrectAnswer = answer.score === 1
                                const isSelectedAnswer =
                                    selectedAnswer === answer.text

                                return (
                                    <div key={index}>
                                        {/* Conditionally render the container only if the answer is selected */}
                                        {isSelectedAnswer && (
                                            <div
                                                className={`answer-wrapper p-4 rounded-lg transition-all duration-300 shadow-md scale-110`}
                                            >
                                                <button
                                                    className={`px-6 py-3 h-28 text-center bg-red opacity-50 font-light rounded-lg shadow-lg transition-colors w-full text-black`}
                                                    disabled
                                                >
                                                    {answer.text}
                                                </button>
                                            </div>
                                        )}

                                        {/* Default button rendering for unselected answers */}
                                        {!isSelectedAnswer && (
                                            <button
                                                className={`px-6 py-3 h-28 text-center font-light rounded-lg shadow-lg transition-colors w-full hover:cursor-pointer ${
                                                    showCorrectAnswer &&
                                                    isCorrectAnswer
                                                        ? 'bg-sec opacity-40'
                                                        : 'bg-white'
                                                }`}
                                                onClick={() =>
                                                    !showCorrectAnswer &&
                                                    handleAnswerClick(answer)
                                                }
                                                disabled={showCorrectAnswer}
                                            >
                                                {answer.text}
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            )}

            {currentQuestion >= questions.length && (
                <div className="flex flex-col">
                    <div className="result-container bg-gray-800 p-6 rounded-lg shadow-md mt-6 w-full">
                        <h2 className="result-text text-xl font-bold text-white">
                            Quiz Geschafft!
                        </h2>
                        <p className="score-text text-white">
                            Deine Punktzahl: {score} von {questions.length}
                        </p>
                    </div>
                    <LinkButton
                        topic={{
                            id: 1,
                            name: topic_name,
                            href: root_href,
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Quiz

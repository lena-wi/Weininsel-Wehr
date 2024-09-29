import { useState, useEffect } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'

const Quiz = ({
    questions_sub_topics_id,
    topic_name,
    root_href,
    isExamMode,
}) => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [showNextButton, setShowNextButton] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let query = supabase
                    .from('questions_with_answers')
                    .select('questions')

                if (isExamMode) {
                    const { data, error } = await query

                    if (error) {
                        console.error('Error fetching questions:', error)
                    } else {
                        if (data && data.length > 0) {
                            const allQuestions = data
                                .map((entry) => entry.questions)
                                .flat()
                            const shuffledQuestions = allQuestions
                                .sort(() => 0.5 - Math.random())
                                .slice(0, Math.min(50, allQuestions.length))
                            setQuestions(shuffledQuestions)
                        } else {
                            console.log('No questions found')
                        }
                    }
                } else {
                    const { data, error } = await query.eq(
                        'questions_sub_topics_id',
                        questions_sub_topics_id
                    )

                    if (error) {
                        console.error('Error fetching questions:', error)
                    } else {
                        if (data && data.length > 0) {
                            const filteredQuestions = data
                                .map((entry) => entry.questions)
                                .flat()
                            setQuestions(filteredQuestions)
                        } else {
                            console.log(
                                'No questions found for this sub-topic ID'
                            )
                        }
                    }
                }
            } catch (err) {
                console.error('Error in fetchQuestions:', err)
            }
        }

        fetchQuestions()
    }, [questions_sub_topics_id, isExamMode])

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer.text)
        setShowCorrectAnswer(true)
        setShowNextButton(true)

        if (answer.score === 1) {
            setScore(score + 1)
        }
    }

    const handleNextQuestion = () => {
        setSelectedAnswer(null)
        setShowCorrectAnswer(false)
        setShowNextButton(false)
        setCurrentQuestion(currentQuestion + 1)
    }

    const question = questions[currentQuestion]

    return (
        <div className="quiz-container p-4 flex flex-col items-start">
            {questions.length === 0 ? (
                <p>Lädt fragen ...</p>
            ) : (
                question && (
                    <div className="question-answer-section space-y-6 w-full">
                        <div className="question-container text-center bg-white p-6 rounded-lg shadow-md w-full text-xl text-black font-light items-center mb-4">
                            {question.questionText}
                        </div>

                        <div className="answers-container grid grid-cols-1 gap-4 w-full">
                            {question.answers.map((answer, index) => {
                                const isCorrectAnswer = answer.score === 1
                                const isSelectedAnswer =
                                    selectedAnswer === answer.text

                                const answerContainerClasses = `
                                    p-4 rounded-lg transition-all duration-250
                                    ${isCorrectAnswer && showCorrectAnswer ? 'bg-answerright' : ''}
                                    ${!isCorrectAnswer && isSelectedAnswer ? 'bg-red' : ''}
                                    ${showCorrectAnswer && isCorrectAnswer && !isSelectedAnswer ? 'bg-answerright' : ''}
                                    ${showCorrectAnswer && !isCorrectAnswer && isSelectedAnswer ? 'opacity-70' : ''}
                                    ${isSelectedAnswer ? 'border-black border-8' : 'border border-2'}
                                `

                                return (
                                    <div className="text-lg" key={index}>
                                        <button
                                            className={`${answerContainerClasses} w-full font-light rounded-lg shadow-lg transition-colors hover:cursor-pointer border-4`}
                                            onClick={() =>
                                                !showCorrectAnswer &&
                                                handleAnswerClick(answer)
                                            }
                                            disabled={showCorrectAnswer}
                                        >
                                            {answer.text}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {showNextButton && (
                            <div>
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-6 mt-8 w-full h-16 bg-white text-black font-semibold rounded-lg shadow-lg hover:cursor-pointer"
                                >
                                    Nächste Frage
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}

            {currentQuestion >= questions.length && (
                <div className="flex w-full flex-col items-center justify-center transition-colors">
                    <SubPageImage />
                    <h2 className="result-text pt-2 text-4xl text-center font-bold text-white mb-4">
                        Quiz Geschafft!
                    </h2>
                    <p className="score-text text-2xl text-gray-300 mb-6">
                        Deine Punktzahl:{' '}
                        <span className="font-bold text-sec">{score}</span> von{' '}
                        <span className="font-bold text-sec">
                            {questions.length}
                        </span>
                    </p>
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

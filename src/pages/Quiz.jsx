import { useState, useEffect, useRef } from 'react'
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [showNextButton, setShowNextButton] = useState(false)

    const nextButtonRef = useRef(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const query = supabase
                    .from('questions_with_answers')
                    .select('questions')

                const { data, error } = isExamMode
                    ? await query
                    : await query.eq(
                          'questions_sub_topics_id',
                          questions_sub_topics_id
                      )

                if (error) {
                    console.error('Error fetching questions:', error)
                    return
                }

                if (data && data.length > 0) {
                    const fetchedQuestions = data
                        .map((entry) => entry.questions)
                        .flat()

                    const processedQuestions = isExamMode
                        ? fetchedQuestions
                              .sort(() => Math.random() - 0.5)
                              .slice(0, Math.min(50, fetchedQuestions.length))
                        : fetchedQuestions

                    setQuestions(processedQuestions)
                } else {
                    console.log('No questions found')
                }
            } catch (err) {
                console.error('Error in fetchQuestions:', err)
            }
        }

        fetchQuestions()
    }, [questions_sub_topics_id, isExamMode])

    const handleAnswerClick = (answer) => {
        if (showCorrectAnswer) return

        setSelectedAnswer(answer.text)
        setShowCorrectAnswer(true)
        setShowNextButton(true)
        if (answer.score === 1) setScore(score + 1)
    }

    const handleNextQuestion = () => {
        setSelectedAnswer(null)
        setShowCorrectAnswer(false)
        setShowNextButton(false)
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    useEffect(() => {
        // Scroll to the Next Question button when it becomes visible
        if (showNextButton && nextButtonRef.current) {
            nextButtonRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [showNextButton])

    const question = questions[currentQuestionIndex]

    return (
        <div className="quiz-container p-4 overflow-y-auto flex flex-col items-start">
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
                                    ${isSelectedAnswer ? 'border-black border-8' : 'border-[1px]'}
                                `

                                return (
                                    <div className="text-lg" key={index}>
                                        <button
                                            className={`${answerContainerClasses} w-full font-light rounded-lg shadow-lg transition-colors hover:cursor-pointer`}
                                            onClick={() =>
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
                            <div
                                className="next-question-button"
                                ref={nextButtonRef}
                            >
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-6 mt-6 w-full h-16 bg-white text-black font-semibold rounded-lg shadow-lg hover:cursor-pointer"
                                >
                                    Nächste Frage
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}

            {currentQuestionIndex >= questions.length && (
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

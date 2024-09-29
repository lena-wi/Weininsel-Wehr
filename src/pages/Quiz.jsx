import { useState, useEffect, useRef } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LinkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import { Dialog } from '@headlessui/react'
import LoadingIndicator from '../components/atoms/LoadingIndicator' // Spinner Component
import { ImageSearch } from '@mui/icons-material'

const imageCache = new Map()

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
    const [loadingQuestions, setLoadingQuestions] = useState(true) // Loading state for questions
    const [loadingImages, setLoadingImages] = useState(false) // Loading state for images
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [imageToShow, setImageToShow] = useState(null) // Store the image to show in the dialog

    const nextButtonRef = useRef(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoadingQuestions(true) // Show loading spinner for questions
            try {
                const query = supabase
                    .from('questions_with_answers')
                    .select(`id, questions`)

                const { data, error } = isExamMode
                    ? await query
                    : await query.eq(
                          'questions_sub_topics_id',
                          questions_sub_topics_id
                      )

                if (error) throw new Error('Error fetching questions:', error)

                const fetchedQuestions = data
                    .map((entry) => entry.questions)
                    .flat()
                const fetchedIds = data.map((entry) => entry.id).flat()

                const processedQuestions = isExamMode
                    ? fetchedQuestions
                          .sort(() => Math.random() - 0.5)
                          .slice(0, 50)
                    : fetchedQuestions

                await fetchImages(processedQuestions, fetchedIds)
            } catch (error) {
                console.error('Error in fetchQuestions:', error)
            } finally {
                setLoadingQuestions(false) // Hide loading spinner
            }
        }

        fetchQuestions()
    }, [questions_sub_topics_id, isExamMode])

    const getImage = async (imageUrl) => {
        if (imageCache.has(imageUrl)) {
            return imageCache.get(imageUrl)
        }

        const response = await fetch(imageUrl)
        const imageBlob = await response.blob()
        const objectUrl = URL.createObjectURL(imageBlob)
        imageCache.set(imageUrl, objectUrl)
        return objectUrl
    }

    const fetchImages = async (questions, ids) => {
        setLoadingImages(true) // Show loading spinner for images
        try {
            const questionsWithImages = await Promise.all(
                questions.map(async (question, index) => {
                    const { data: imageData, error: imageError } =
                        await supabase
                            .from('questions_images')
                            .select('url')
                            .eq('questions_id', ids[index])

                    if (imageError) {
                        console.error('Error fetching images:', imageError)
                        return question
                    }

                    const imageUrl =
                        imageData.length > 0
                            ? await getImage(imageData[0].url)
                            : null // Add image URL if available
                    return {
                        ...question,
                        image: imageUrl,
                    }
                })
            )

            setQuestions(questionsWithImages)
        } catch (error) {
            console.error('Error in fetchImages:', error)
        } finally {
            setLoadingImages(false) // Hide loading spinner for images
        }
    }

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
        if (showNextButton && nextButtonRef.current) {
            nextButtonRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [showNextButton])

    const question = questions[currentQuestionIndex]

    const handleImageClick = (imageUrl) => {
        setImageToShow(imageUrl)
        setShowImageDialog(true)
    }

    return (
        <div className="quiz-container p-4 overflow-y-auto flex flex-col items-start">
            {loadingQuestions ? (
                <LoadingIndicator /> // Show loading spinner while fetching questions
            ) : loadingImages ? (
                <LoadingIndicator /> // Show loading spinner while fetching images
            ) : questions.length === 0 ? (
                <p>Lädt fragen ...</p>
            ) : (
                question && (
                    <div className="question-answer-section space-y-6 w-full">
                        <div className="question-container text-center bg-white p-6 rounded-lg shadow-md w-full text-xl text-black font-light items-center mb-4">
                            {question.questionText}
                            {question.image && (
                                <div className="mt-2">
                                    <ImageSearch
                                        sx={{ fontSize: 50 }}
                                        onClick={() =>
                                            handleImageClick(question.image)
                                        }
                                        className="hover:cursor-pointer"
                                    />
                                </div>
                            )}
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

            {currentQuestionIndex >= questions.length && !loadingQuestions && (
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

            {/* Image dialog popup */}
            <Dialog
                open={showImageDialog}
                onClose={() => setShowImageDialog(false)}
                className="relative z-50 bg-white"
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-75"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md">
                        <img
                            src={imageToShow}
                            alt="Question related"
                            className="rounded-lg"
                        />
                        <button
                            onClick={() => setShowImageDialog(false)}
                            className="mt-4 px-4 py-2 bg-white rounded-md shadow-lg"
                        >
                            Schließen
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default Quiz

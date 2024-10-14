import { useState, useEffect, useRef } from 'react'
import supabase from '../services/supabaseClient'
import { Dialog } from '@headlessui/react'
import LoadingIndicator from '../components/atoms/LoadingIndicator'
import { ImageSearch } from '@mui/icons-material'
import { CACHE_TIME_LIMIT } from '../services/globalConsts'
import ResultPage from './ResultPage'

const imageCache = new Map()

const Quiz = ({ questions_sub_topics_id, root_href, isExamMode }) => {
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [showNextButton, setShowNextButton] = useState(false)
    const [loadingQuestions, setLoadingQuestions] = useState(true)
    const [loadingImages, setLoadingImages] = useState(false)
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [imageToShow, setImageToShow] = useState(null)

    const nextButtonRef = useRef(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoadingQuestions(true)
            try {
                const cachedData = getCachedQuestions()

                if (cachedData && !isExamMode) {
                    setQuestions(cachedData.questions)
                    // Set the images if available in cache
                    if (cachedData.images) {
                        cachedData.questions.forEach((question, index) => {
                            question.image = cachedData.images[index]
                        })
                    }
                } else {
                    const query = supabase
                        .from('questions_with_answers')
                        .select(`id, questions`)

                    const { data, error } = isExamMode
                        ? await query
                        : await query.eq(
                              'questions_sub_topics_id',
                              questions_sub_topics_id
                          )

                    if (error)
                        throw new Error('Error fetching questions:', error)

                    const fetchedQuestions = data
                        .map((entry) => entry.questions)
                        .flat()
                    const fetchedIds = data.map((entry) => entry.id).flat()
                    const processedQuestions = isExamMode
                        ? fetchedQuestions
                              .sort(() => Math.random() - 0.5)
                              .slice(0, 50)
                        : fetchedQuestions

                    // Fetch images for the processed questions
                    const images = await fetchImages(
                        processedQuestions,
                        fetchedIds
                    )

                    // Cache the questions along with their images if not in exam mode
                    if (!isExamMode) {
                        cacheQuestions(processedQuestions, images)
                    }

                    // Set the questions with their images
                    setQuestions(
                        processedQuestions.map((q, index) => ({
                            ...q,
                            image: images[index],
                        }))
                    )
                }
            } catch (error) {
                console.error('Error in fetchQuestions:', error)
            } finally {
                setLoadingQuestions(false)
            }
        }

        fetchQuestions()
    }, [questions_sub_topics_id, isExamMode])

    const getCachedQuestions = () => {
        const cachedData = sessionStorage.getItem(
            `quiz-questions-${questions_sub_topics_id}`
        )
        if (cachedData) {
            const { questions, images, timestamp } = JSON.parse(cachedData)
            const currentTime = new Date().getTime()

            if (currentTime - timestamp < CACHE_TIME_LIMIT) {
                return { questions, images }
            } else {
                sessionStorage.removeItem(
                    `quiz-questions-${questions_sub_topics_id}`
                )
            }
        }
        return null
    }

    const cacheQuestions = (questions, images) => {
        const dataToCache = {
            questions,
            images,
            timestamp: new Date().getTime(),
        }
        sessionStorage.setItem(
            `quiz-questions-${questions_sub_topics_id}`,
            JSON.stringify(dataToCache)
        )
    }

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
        setLoadingImages(true)
        const images = await Promise.all(
            questions.map(async (question, index) => {
                const { data: imageData, error: imageError } = await supabase
                    .from('questions_images')
                    .select('url')
                    .eq('questions_id', ids[index])

                if (imageError) {
                    console.error('Error fetching images:', imageError)
                    return null // Return null if there's an error
                }

                // Fetch image if exists
                return imageData.length > 0
                    ? await getImage(imageData[0].url)
                    : null
            })
        )

        setLoadingImages(false)
        return images // Return the array of image URLs
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
                <LoadingIndicator />
            ) : loadingImages ? (
                <LoadingIndicator />
            ) : questions.length === 0 ? (
                <p>Lädt fragen ...</p>
            ) : (
                question && (
                    <div className="question-answer-section w-full">
                        <div className="question-container text-center rounded-md mb-14 font-bold bg-white border p-6 shadow-md w-full text-xl text-black items-center">
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

                        <div className="answers-container grid grid-cols-1 gap-6 w-full">
                            {question.answers.map((answer, index) => {
                                const isCorrectAnswer = answer.score === 1
                                const isSelectedAnswer =
                                    selectedAnswer === answer.text

                                const answerContainerClasses = `
                                    p-4 rounded-lg transition-all duration-250
                                    ${isCorrectAnswer && showCorrectAnswer ? 'bg-green' : ''}
                                    ${!isCorrectAnswer && isSelectedAnswer ? 'bg-red' : ''}
                                    ${showCorrectAnswer && isCorrectAnswer && !isSelectedAnswer ? 'bg-green' : ''}
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
                                    className="px-6 mt-14 w-full h-16 border bg-answerblack text-white font-semibold rounded-lg shadow-lg hover:cursor-pointer"
                                >
                                    Nächste Frage
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}

            {currentQuestionIndex >= questions.length && !loadingQuestions && (
                <ResultPage
                    score={score}
                    questions={questions}
                    rootHref={root_href}
                />
            )}

            <Dialog
                open={showImageDialog}
                onClose={() => setShowImageDialog(false)}
                className="relative z-50"
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
                        <img
                            src={imageToShow}
                            alt="Question related"
                            className="w-full h-auto"
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default Quiz

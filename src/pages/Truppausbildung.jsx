import React, { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'
import LoadingIndicator from '../components/atoms/LoadingIndicator'
import { PRUEFUNGSMODUS_ID } from '../services/topicsHelper'

const CACHE_TIME_LIMIT = 20 * 60 * 1000 // 20 minutes in milliseconds

const Truppausbildung = ({ sub_topic_id }) => {
    const [topics, setTopics] = useState([])
    const [quizTopics, setQuizTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true)
            try {
                const cachedData = getCachedTopics(sub_topic_id)
                if (cachedData) {
                    setTopics(cachedData.topics)
                    setQuizTopics(cachedData.quizTopics)
                } else {
                    const [
                        { data: topicsData, error: topicsError },
                        { data: quizData, error: quizError },
                    ] = await Promise.all([
                        supabase
                            .from('topics')
                            .select()
                            .eq('sub_topic_id', sub_topic_id)
                            .eq('is_active', true)
                            .eq('is_quiz_topic', false),
                        supabase
                            .from('topics')
                            .select()
                            .eq('sub_topic_id', sub_topic_id)
                            .eq('is_quiz_topic', true),
                    ])

                    if (topicsError || quizError)
                        throw new Error('Fehler beim Laden der Themen')

                    setTopics(topicsData || [])
                    setQuizTopics(quizData || [])
                    cacheTopics(sub_topic_id, topicsData, quizData)
                }
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchTopics()
    }, [sub_topic_id])

    const getCachedTopics = (sub_topic_id) => {
        const cachedData = localStorage.getItem(`topics-${sub_topic_id}`)
        if (cachedData) {
            const { topics, quizTopics, timestamp } = JSON.parse(cachedData)
            const currentTime = new Date().getTime()

            if (currentTime - timestamp < CACHE_TIME_LIMIT) {
                return { topics, quizTopics }
            } else {
                localStorage.removeItem(`topics-${sub_topic_id}`)
            }
        }
        return null
    }

    const cacheTopics = (sub_topic_id, topics, quizTopics) => {
        const dataToCache = {
            topics,
            quizTopics,
            timestamp: new Date().getTime(),
        }
        localStorage.setItem(
            `topics-${sub_topic_id}`,
            JSON.stringify(dataToCache)
        )
    }

    const renderContent = () => {
        if (loading) return <LoadingIndicator />
        if (error)
            return (
                <p className="text-lg text-red-500">
                    Fehler beim Laden der Themen.
                </p>
            )
        if (topics.length === 0)
            return <p className="text-lg mt-4">Keine Themen verfügbar.</p>

        return (
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-4">
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        )
    }

    const renderQuizContent = () => {
        if (quizTopics.length === 0)
            return <p className="text-lg mt-4">Keine Quiz Themen verfügbar.</p>

        return (
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-4">
                {quizTopics
                    .sort((a, b) =>
                        a.id === PRUEFUNGSMODUS_ID
                            ? -1
                            : b.id === PRUEFUNGSMODUS_ID
                              ? 1
                              : 0
                    )
                    .map((topic, index) => (
                        <LinkButton key={index} topic={topic} />
                    ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            {renderContent()}
            <TopicHeadline text={'💭 Quiz 💭'} />
            {renderQuizContent()}
        </div>
    )
}

export default Truppausbildung

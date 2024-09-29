import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LinkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'
import { PRUEFUNGSMODUS_ID } from '../services/topicsHelper'

const Truppausbildung = ({ sub_topic_id }) => {
    useEffect(() => {
        getTopics()
        getQuizTopics()
    }, [])

    async function getTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('sub_topic_id', sub_topic_id)
            .eq('is_active', true)
            .eq('is_quiz_topic', false)
        setTopics(data)
    }
    const [topics, setTopics] = useState([])

    async function getQuizTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('sub_topic_id', sub_topic_id)
            .eq('is_quiz_topic', true)
        setQuizTopics(data)
    }
    const [quizTopics, setQuizTopics] = useState([])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-4">
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
            <TopicHeadline text={'💭 Quiz 💭'} />
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-4">
                {quizTopics
                    .sort((a, b) =>
                        a.id === PRUEFUNGSMODUS_ID
                            ? -1
                            : b.id === PRUEFUNGSMODUS_ID
                              ? 1
                              : 0
                    ) // Sorting to put id 30 at the top
                    .map((topic, index) => (
                        <LinkButton key={index} topic={topic} />
                    ))}
            </div>
        </div>
    )
}

export default Truppausbildung

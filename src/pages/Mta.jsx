import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'

const Mta = ({ sub_topic_id }) => {
    useEffect(() => {
        getTopics()
        getQuizTopics()
    }, [])

    async function getTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('sub_topic_id', sub_topic_id)
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-6">
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
            <TopicHeadline text={'💭 Quiz 💭'} />
            <div className="flex py-4 md:text-xl text-lg flex-col space-y-6">
                {quizTopics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default Mta

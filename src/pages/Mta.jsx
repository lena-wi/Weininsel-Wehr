import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'

const Mta = ({ main_topics_id }) => {
    useEffect(() => {
        getTopics()
    }, [])

    async function getTopics() {
        const { data } = await supabase
            .from('sub_topics')
            .select()
            .eq('sub_topics_main_topics_id', main_topics_id)
        setTopics(data)
    }
    const [topics, setTopics] = useState([])

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
        </div>
    )
}

export default Mta

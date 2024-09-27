import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'

const Leistungspruefung = ({ sub_topic_id }) => {
    useEffect(() => {
        getTopics()
    }, [])

    async function getTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('sub_topic_id', sub_topic_id)
            .eq('is_active', true)

        setTopics(data)
    }

    const [topics, setTopics] = useState([])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <SubPageImage />
            <div className="flex md:text-xl text-lg flex-col space-y-6">
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}
export default Leistungspruefung

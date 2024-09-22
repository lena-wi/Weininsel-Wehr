import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from './atoms/LInkButton'
import logo from '../assets/ffwlogo.png'

const MainScreen = () => {
    useEffect(() => {
        getTopics()
        getInfoTopic()
    }, [])

    async function getTopics() {
        const { data } = await supabase
            .from('main_topics')
            .select()
            .neq('id', 8)
        setTopics(data)
    }
    const [topics, setTopics] = useState([])

    async function getInfoTopic() {
        const { data } = await supabase.from('main_topics').select().eq('id', 8)

        setInfoTopic(data)
    }
    const [infoTopic, setInfoTopic] = useState([])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-2/5 md:w-1/2 h-auto object-cover mb-8"
            />

            <div className="flex md:text-xl text-lg flex-col space-y-6">
                {infoTopic.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default MainScreen

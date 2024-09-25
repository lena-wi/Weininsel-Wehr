import LinkButton from './atoms/LInkButton'
import logo from '../assets/ffwlogo.png'
import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'

const MainScreen = () => {
    useEffect(() => {
        getHomeTopics()
    }, [])

    async function getHomeTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('is_home_topic', true)
        setHomeTopics(data)
    }

    const [homeTopics, setHomeTopics] = useState([])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-2/5 md:w-1/2 h-auto object-cover mb-8"
            />

            <div className="flex md:text-xl text-lg flex-col space-y-6">
                {homeTopics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default MainScreen

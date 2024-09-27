import LinkButton from './atoms/LInkButton'
import logo from '../assets/ffwlogo.png'
import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import Calendar from './organisms/Calender'

const MainScreen = () => {
    useEffect(() => {
        getHomeTopics()
    }, [])

    async function getHomeTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('is_home_topic', true)
            .eq('is_active', true)
        setHomeTopics(data)
    }

    const [homeTopics, setHomeTopics] = useState([])

    return (
        <div className="flex flex-col overflow-y-hidden items-center h-screen p-4">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-1/3 md:w-1/2 lg:w-1/4 opacity-80 h-auto object-cover"
            />
            <div className="py-6">
                <Calendar />
            </div>
            <div className="flex md:text-xl pt-4 text-lg flex-col space-y-6">
                {homeTopics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default MainScreen

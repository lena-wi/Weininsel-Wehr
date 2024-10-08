import LinkButton from '../components/atoms/LInkButton'
import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import Calendar from '../components/organisms/Calender'
import logo from '../../assets/ffwlogo.webp'

const MainScreen = () => {
    const [homeTopics, setHomeTopics] = useState([])

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

    return (
        <div className="flex flex-col items-center p-4">
            <img
                src={logo}
                alt="logo firedepartment"
                className={`w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover`}
            />
            <div className="py-6">
                <Calendar />
            </div>
            <div className="flex w-64 md:text-xl pt-4 text-lg flex-col space-y-6">
                {homeTopics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default MainScreen

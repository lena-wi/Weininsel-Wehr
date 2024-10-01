import LinkButton from '../components/atoms/LInkButton'
import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import Calendar from '../components/organisms/Calender'
import LoadingIndicator from '../components/atoms/LoadingIndicator'

const MainScreen = () => {
    const [homeTopics, setHomeTopics] = useState([])
    const [loadingImage, setLoadingImage] = useState(true) // For image loading state

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

    const handleImageLoad = () => {
        setLoadingImage(false)
    }

    return (
        <div className="flex flex-col items-center p-4">
            {loadingImage && (
                <div className="flex justify-center py-4">
                    <LoadingIndicator />
                </div>
            )}
            <img
                src="https://mipbtnsxhpoikpsltmtr.supabase.co/storage/v1/object/public/Weininsel-Wehr/ffwlogo.webp"
                alt="logo firedepartment"
                className={`w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover ${loadingImage ? 'hidden' : 'block'}`}
                onLoad={handleImageLoad}
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

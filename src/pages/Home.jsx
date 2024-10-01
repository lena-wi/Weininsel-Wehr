import LinkButton from '../components/atoms/LInkButton'
import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import Calendar from '../components/organisms/Calender'
import LoadingIndicator from '../components/atoms/LoadingIndicator'

const MainScreen = () => {
    const [homeTopics, setHomeTopics] = useState([])
    const [loadingImage, setLoadingImage] = useState(true) // For image loading state
    const [imageSrc, setImageSrc] = useState(null) // State to hold the image source
    const IMAGE_URL =
        'https://mipbtnsxhpoikpsltmtr.supabase.co/storage/v1/object/public/Weininsel-Wehr/ffwlogo.webp'
    const CACHE_KEY = 'mainScreenImageCache'

    useEffect(() => {
        getHomeTopics()
        loadImageFromCache()
    }, [])

    async function getHomeTopics() {
        const { data } = await supabase
            .from('topics')
            .select()
            .eq('is_home_topic', true)
            .eq('is_active', true)
        setHomeTopics(data)
    }

    // Function to load the image from session storage or fetch a new one
    const loadImageFromCache = () => {
        const cachedImage = sessionStorage.getItem(CACHE_KEY)
        if (cachedImage) {
            setImageSrc(cachedImage)
            setLoadingImage(false)
        } else {
            // If there's no valid cache, use the image URL
            setImageSrc(IMAGE_URL)
        }
    }

    const handleImageLoad = () => {
        setLoadingImage(false)
        // Cache the loaded image in session storage
        sessionStorage.setItem(CACHE_KEY, IMAGE_URL)
    }

    return (
        <div className="flex flex-col items-center p-4">
            {loadingImage && (
                <div className="flex justify-center py-4">
                    <LoadingIndicator />
                </div>
            )}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="logo firedepartment"
                    className={`w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover ${loadingImage ? 'hidden' : 'block'}`}
                    onLoad={handleImageLoad}
                />
            )}
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

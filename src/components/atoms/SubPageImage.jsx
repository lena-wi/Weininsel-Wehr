import { useState, useEffect } from 'react'
import LoadingIndicator from '../atoms/LoadingIndicator'

const SubPageImage = () => {
    const [loadingImage, setLoadingImage] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)
    const IMAGE_URL =
        'https://mipbtnsxhpoikpsltmtr.supabase.co/storage/v1/object/public/Weininsel-Wehr/subLogo.webp'
    const CACHE_KEY = 'subPageImageCache'
    const CACHE_DURATION = 20 * 60 * 1000 // 20 minutes in milliseconds

    useEffect(() => {
        // Function to load the image from cache or fetch a new one
        const loadImage = async () => {
            const cachedData = JSON.parse(sessionStorage.getItem(CACHE_KEY))
            if (cachedData) {
                const { src, timestamp } = cachedData
                const isExpired = Date.now() - timestamp > CACHE_DURATION

                if (!isExpired) {
                    // Use cached image
                    setImageSrc(src)
                    setLoadingImage(false)
                    return
                }
            }

            // If there's no valid cache, fetch the image and cache it
            try {
                const response = await fetch(IMAGE_URL)
                if (!response.ok) throw new Error('Image fetch failed')

                const imageObjectURL = IMAGE_URL // Directly use the image URL

                setImageSrc(imageObjectURL)
                setLoadingImage(false)

                // Cache the new image URL in session storage
                sessionStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({
                        src: imageObjectURL,
                        timestamp: Date.now(),
                    })
                )
            } catch (error) {
                console.error('Error loading image:', error)
                setLoadingImage(false)
            }
        }

        loadImage()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-4">
            {loadingImage && (
                <div className="flex justify-center py-4">
                    <LoadingIndicator />
                </div>
            )}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="SubPage Fire Department Logo"
                    className="w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover"
                    onLoad={() => setLoadingImage(false)}
                />
            )}
        </div>
    )
}

export default SubPageImage

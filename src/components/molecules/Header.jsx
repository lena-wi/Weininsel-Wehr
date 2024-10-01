import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoadingIndicator from '../atoms/LoadingIndicator'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const [loadingImage, setLoadingImage] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)
    const IMAGE_URL =
        'https://mipbtnsxhpoikpsltmtr.supabase.co/storage/v1/object/public/Weininsel-Wehr/ffwlogo.webp'
    const CACHE_KEY = 'headerLogoCache'
    const CACHE_DURATION = 20 * 60 * 1000 // 20 minutes in milliseconds

    // Check and load the image from cache if available and not expired
    const loadImageFromCache = () => {
        const cachedData = sessionStorage.getItem(CACHE_KEY)
        if (cachedData) {
            const { src, timestamp } = JSON.parse(cachedData)
            if (Date.now() - timestamp < CACHE_DURATION) {
                setImageSrc(src)
                setLoadingImage(false)
                return true
            }
        }
        return false
    }

    // Cache the image in local storage
    const cacheImage = (imageURL) => {
        sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ src: imageURL, timestamp: Date.now() })
        )
    }

    useEffect(() => {
        const cached = loadImageFromCache()

        if (!cached) {
            // If no valid cache, load the image and cache it
            const img = new Image()
            img.src = IMAGE_URL
            img.onload = () => {
                setImageSrc(IMAGE_URL)
                setLoadingImage(false)
                cacheImage(IMAGE_URL)
            }
            img.onerror = (err) => {
                console.error('Error loading image:', err)
                setLoadingImage(false)
            }
        }
    }, [])

    return (
        <header className="shadow-lg mb-4 py-1 lg:py-4 bg-green transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {location.pathname !== '/' && (
                        <div
                            className="flex-shrink-0 cursor-pointer text-black opacity-65"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIcon fontSize="large" />
                        </div>
                    )}

                    <span className="text-black opacity-65 text-xl justify-center w-full flex">
                        "Die" Weininsel-Wehr
                    </span>

                    <Link to="/">
                        <div className="flex-shrink-0">
                            {loadingImage && (
                                <div className="flex justify-center py-4">
                                    <LoadingIndicator />
                                </div>
                            )}
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    alt="Logo"
                                    className={`w-14 opacity-80 object-fit ${loadingImage ? 'hidden' : 'block'}`}
                                />
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

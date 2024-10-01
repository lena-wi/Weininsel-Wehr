import { useState } from 'react'
import LoadingIndicator from '../atoms/LoadingIndicator'

const SubPageImage = () => {
    const [loadingImage, setLoadingImage] = useState(true)

    const handleImageLoad = () => {
        setLoadingImage(false)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full py-4">
            {loadingImage && (
                <div className="flex justify-center py-4">
                    <LoadingIndicator />
                </div>
            )}
            <img
                src="https://mipbtnsxhpoikpsltmtr.supabase.co/storage/v1/object/public/Weininsel-Wehr/subLogo.webp"
                alt="SubPage Fire Department Logo"
                className={`w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover ${loadingImage ? 'hidden' : 'block'}`}
                onLoad={handleImageLoad}
            />
        </div>
    )
}

export default SubPageImage

import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../../assets/ffwlogo.webp'
import { MTA_HREF } from '../../services/topicsHelper'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSpecialHref, setIsSpecialHref] = useState({
        isMtaHref: false,
        isLernunterlagen: false,
    })

    useEffect(() => {
        const isMtaHref = location.pathname === MTA_HREF
        const isLernunterlagen = location.pathname === '/lernunterlagen'
        setIsSpecialHref({ isMtaHref, isLernunterlagen })
    }, [location.pathname])

    const handleBackNavigation = () => {
        navigate(-1)
    }

    return (
        <header className="shadow-lg mb-4 py-1 lg:py-4 bg-green transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {location.pathname !== '/' && (
                        <div className="flex-shrink-0 cursor-pointer text-black opacity-65">
                            {isSpecialHref.isMtaHref ? (
                                <Link to="/lernunterlagen">
                                    <ArrowBackIcon fontSize="large" />
                                </Link>
                            ) : isSpecialHref.isLernunterlagen ? (
                                <Link to="/">
                                    <ArrowBackIcon fontSize="large" />
                                </Link>
                            ) : (
                                <div onClick={handleBackNavigation}>
                                    <ArrowBackIcon fontSize="large" />
                                </div>
                            )}
                        </div>
                    )}

                    <span className="text-black opacity-65 text-xl justify-center w-full flex">
                        "Die" Weininsel-Wehr
                    </span>

                    <Link to="/">
                        <div className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-14 opacity-80 object-fit"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

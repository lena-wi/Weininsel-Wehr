import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../../assets/ffwlogo.webp'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

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
                            <img
                                src={logo}
                                alt="Logo"
                                className={`w-14 opacity-80 object-fit}`}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

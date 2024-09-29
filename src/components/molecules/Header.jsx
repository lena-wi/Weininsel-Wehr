import logo from '../../assets/ffwlogo.webp'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="shadow-lg py-1 bg-green transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <Link to="/">
                        <div className="flex-shrink-0">
                            <img
                                className="w-14 opacity-80 object-fit"
                                src={logo}
                                alt="Logo"
                            />
                        </div>
                    </Link>
                    <span className="text-black opacity-65 text-xl justify-center w-full flex">
                        "Die" Weininsel-Wehr
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header

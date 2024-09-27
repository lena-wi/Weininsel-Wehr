import logo from '../../assets/subLogo.webp'
const SubPageImage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover"
            />
            <span className="text-center text-black opacity-80 text-2xl font-extralight mb-5">
                Weininsel-Wehr
            </span>
        </div>
    )
}

export default SubPageImage

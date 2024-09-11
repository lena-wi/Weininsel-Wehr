import logo from '../../assets/subLogo.png'
const SubPageImage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-1/2 md:w-1/5 opacity-70 h-auto object-cover mb-6"
            />
            <span className="text-center text-black opacity-80 text-2xl font-extralight mb-5">
                Weininsel-Wehr
            </span>
        </div>
    )
}

export default SubPageImage

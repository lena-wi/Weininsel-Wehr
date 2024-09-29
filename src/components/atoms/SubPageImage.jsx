import logo from '../../assets/subLogo.webp'
const SubPageImage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-4">
            <img
                src={logo}
                alt="logo firedepartment"
                className="w-3/12 md:w-1/6 lg:w-2/12 xl:w-1/12 opacity-80 h-auto object-cover"
            />
        </div>
    )
}

export default SubPageImage

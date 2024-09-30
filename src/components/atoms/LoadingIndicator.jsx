import FireTruckIcon from '@mui/icons-material/FireTruck'

const LoadingIndicator = () => (
    <div className="flex justify-center items-center w-full h-full relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-red"></div>
        <FireTruckIcon className="absolute h-36 w-36 text-black" />
    </div>
)

export default LoadingIndicator

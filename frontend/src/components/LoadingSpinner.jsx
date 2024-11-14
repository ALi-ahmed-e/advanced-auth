import React from 'react'
import { ImSpinner9 } from "react-icons/im";
const LoadingSpinner = () => {
    return (
        <div className='min-h-screen z-50 w-full fixed bg-gray-900/80 backdrop-blur-md flex items-center justify-center  overflow-hidden'>

            <ImSpinner9
            className='w-16 h-16 animate-spin text-green-600'
            />
        </div>
    )
}

export default LoadingSpinner
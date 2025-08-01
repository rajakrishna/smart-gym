import ICONS from '@/constants/icons'
import React from 'react'

const UnderConstruction = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pb-24 gap-4">
            <h1 className="text-4xl font-bold">Under Construction</h1>
            {/* Icon */}
            <ICONS.construction className="w-16 h-16 text-gray-500" />
            <p className="text-lg text-center">This page is under construction. Please check back later.</p>
            <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    )
}

export default UnderConstruction
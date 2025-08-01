'use client'

import React from 'react'
import Barcode from 'react-barcode'

const userId = '3179294'

const ReactBarcode = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Barcode value={userId} />
        </div>
    )
}

export default ReactBarcode
import React from 'react'

function Error({message}) {
    return (
        <div>
            <h1>Error</h1>
            <h2>{message || ''}</h2>
        </div>
    )
}

export default Error

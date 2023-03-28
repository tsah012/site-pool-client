import React from 'react';
import SnailGif from '../../static/gifs/snail.gif';

function Loading() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={SnailGif} alt='LOADING' style={{ maxWidth: '50%' }} />
        </div>
    )
}

export default Loading

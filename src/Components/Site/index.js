import React from 'react';

function index({ name, url }) {
    return (
        <div style={{ display: 'flex' }} >
            <iframe src={url}
                name={name}
                style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%' }}>
            </iframe>
        </ div>
    )
}

export default index

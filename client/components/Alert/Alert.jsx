import React from 'react';

export const Alert = ({ msg }) => {
    return (
        <div>
            <h3 style={{color:"tomato"}}>
                {msg}
            </h3>
        </div>
    )
}

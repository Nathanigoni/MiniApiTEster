import React, { useState } from 'react';

const UrlInput = ({ setUrl }) => {
    const [url, setUrlState] = useState('');

    const handleChange = (e) => {
        setUrlState(e.target.value);
    };

    const handleBlur = () => {
        try {
            new URL(url);
            setUrl(url);
        } catch (error) {
            alert('Invalid URL format');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter API URL"
                required
            />
        </div>
    );
};

export default UrlInput;
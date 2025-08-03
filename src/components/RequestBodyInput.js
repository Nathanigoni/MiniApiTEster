import React, { useState } from 'react';

const RequestBodyInput = ({ body, setBody }) => {
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setBody(value);

        try {
            JSON.parse(value);
            setError('');
        } catch (e) {
            setError('Invalid JSON format');
        }
    };

    return (
        <div>
            <textarea
                value={body}
                onChange={handleChange}
                placeholder="Enter request body in JSON format"
                rows="10"
                cols="50"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default RequestBodyInput;
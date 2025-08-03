import React, { useEffect, useState } from 'react';

const SavedRequests = ({ onLoadRequest }) => {
    const [savedRequests, setSavedRequests] = useState([]);

    useEffect(() => {
        const requests = JSON.parse(localStorage.getItem('savedRequests')) || [];
        setSavedRequests(requests);
    }, []);

    const handleLoadRequest = (request) => {
        onLoadRequest(request);
    };

    return (
        <div>
            <h2>Saved Requests</h2>
            <ul>
                {savedRequests.map((request, index) => (
                    <li key={index}>
                        <button onClick={() => handleLoadRequest(request)}>
                            {request.url} - {request.method}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedRequests;
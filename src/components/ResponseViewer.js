import React from 'react';

const ResponseViewer = ({ response }) => {
    const formatJson = (json) => {
        return JSON.stringify(json, null, 2);
    };

    return (
        <div className="response-viewer">
            <h2>Response</h2>
            <pre>{response ? formatJson(response) : 'No response yet.'}</pre>
        </div>
    );
};

export default ResponseViewer;
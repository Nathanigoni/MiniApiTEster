// App.js
import React, { useState, useEffect } from 'react';
import HeaderInput from './components/HeaderInput';
import MethodSelector from './components/MethodSelector';
import RequestBodyInput from './components/RequestBodyInput';
import ResponseViewer from './components/ResponseViewer';
import SavedRequests from './components/SavedRequests';
import UrlInput from './components/UrlInput';
import './styles/App.css';

const App = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState({});
    const [body, setBody] = useState('');
    const [response, setResponse] = useState(null);
    const [savedRequests, setSavedRequests] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedRequests')) || [];
        setSavedRequests(saved);
    }, []);

    const handleRequest = async () => {
        try {
            const fetchHeaders = { ...headers };
            // Only set Content-Type if not already set and method is not GET
            if (!fetchHeaders['Content-Type'] && method !== 'GET') {
                fetchHeaders['Content-Type'] = 'application/json';
            }

            const options = {
                method,
                headers: fetchHeaders,
            };

            if (method !== 'GET' && body) {
                options.body = fetchHeaders['Content-Type'] === 'application/json'
                    ? JSON.stringify(body)
                    : body;
            }

            const res = await fetch(url, options);

            let data;
            try {
                data = await res.json();
            } catch {
                data = await res.text();
            }

            setResponse({ status: res.status, data });
        } catch (error) {
            setResponse({ error: 'Failed to fetch' });
        }
    };

    const saveRequest = () => {
        const newRequest = { url, method, headers, body };
        const updatedRequests = [...savedRequests, newRequest];
        setSavedRequests(updatedRequests);
        localStorage.setItem('savedRequests', JSON.stringify(updatedRequests));
    };

    return (
        <div className="container">
            <h1>MiniAPI Tester</h1>

            <div className="input-group">
                <UrlInput url={url} setUrl={setUrl} />
                <MethodSelector method={method} setMethod={setMethod} />
                <HeaderInput headers={headers} setHeaders={setHeaders} />
                <RequestBodyInput body={body} setBody={setBody} />
            </div>

            <div style={{ marginTop: '10px' }}>
                <button className="button" onClick={handleRequest}>Send Request</button>
                <button className="button" onClick={saveRequest} style={{ marginLeft: '10px' }}>Save Request</button>
            </div>

            <ResponseViewer response={response} />

            <div className="saved-requests">
                <SavedRequests
                    savedRequests={savedRequests}
                    setUrl={setUrl}
                    setMethod={setMethod}
                    setHeaders={setHeaders}
                    setBody={setBody}
                />
            </div>
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import UrlInput from './components/UrlInput';
import MethodSelector from './components/MethodSelector';
import HeaderInput from './components/HeaderInput';
import RequestBodyInput from './components/RequestBodyInput';
import ResponseViewer from './components/ResponseViewer';
import SavedRequests from './components/SavedRequests';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const handleAddHeader = ({ key, value }) => {
    setHeaders((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSendRequest = async () => {
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }

    const options = {
      method,
      headers,
    };

    if (method !== 'GET' && body) {
      try {
        options.body = JSON.stringify(JSON.parse(body));
        options.headers['Content-Type'] = 'application/json';
      } catch (e) {
        alert("Request body must be valid JSON.");
        return;
      }
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);

      // Save request to localStorage
      const saved = JSON.parse(localStorage.getItem('savedRequests')) || [];
      saved.push({ url, method, headers, body });
      localStorage.setItem('savedRequests', JSON.stringify(saved));
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  const handleLoadRequest = (req) => {
    setUrl(req.url);
    setMethod(req.method);
    setHeaders(req.headers);
    setBody(req.body);
  };

  return (
    <div className="container">
      <h1>MiniAPI Tester</h1>
      
      <UrlInput setUrl={setUrl} />
      <MethodSelector method={method} setMethod={setMethod} />
      <HeaderInput onAddHeader={handleAddHeader} />
      <RequestBodyInput body={body} setBody={setBody} />
      
      <button className="button" onClick={handleSendRequest}>
        Send Request
      </button>

      {response && <ResponseViewer response={response} />}
      
      <SavedRequests onLoadRequest={handleLoadRequest} />
    </div>
  );
};

export default App;

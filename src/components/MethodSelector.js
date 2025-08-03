import React from 'react';

const MethodSelector = ({ method, setMethod }) => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

    return (
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
            {methods.map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    );
};

export default MethodSelector;
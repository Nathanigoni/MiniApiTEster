import React, { useState } from 'react';

const HeaderInput = ({ onAddHeader }) => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const handleAddHeader = () => {
        if (key && value) {
            onAddHeader({ key, value });
            setKey('');
            setValue('');
        }
    };

    return (
        <div className="header-input">
            <input
                type="text"
                placeholder="Header Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <input
                type="text"
                placeholder="Header Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleAddHeader}>Add Header</button>
        </div>
    );
};

export default HeaderInput;
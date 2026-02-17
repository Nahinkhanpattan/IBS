import React, { useState } from 'react';
import { grantPermission } from '../services/api';

const GrantPermission = () => {
    const [address, setAddress] = useState('');
    const [resource, setResource] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const data = await grantPermission(address, resource);
            setMessage(`Permission granted: ${data.txHash}`);
        } catch (err) {
            setError(err.error || 'Failed to grant permission');
        }
    };

    return (
        <div className="card">
            <h3>Grant Permission</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Device Address (0x...)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Resource (e.g., temp_sensor)"
                    value={resource}
                    onChange={(e) => setResource(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit">Grant</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default GrantPermission;

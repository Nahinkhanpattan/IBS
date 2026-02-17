import React, { useState } from 'react';
import { registerDevice } from '../services/api';

const RegisterDevice = () => {
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const data = await registerDevice(address);
            setMessage(`Device registered: ${data.txHash}`);
        } catch (err) {
            setError(err.error || 'Failed to register device');
        }
    };

    return (
        <div className="card">
            <h3>Register Device</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Device Address (0x...)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RegisterDevice;

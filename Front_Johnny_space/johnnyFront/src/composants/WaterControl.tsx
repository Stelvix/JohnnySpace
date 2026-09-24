import { useState } from 'react';

interface WaterControlProps {
    backendUrl?: string;
}

export function WaterControl({ backendUrl = 'http://localhost:3001/api' }: WaterControlProps) {
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(30);
    const [message, setMessage] = useState('');

    const handleWater = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${backendUrl}/actions/water`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    duration,
                    isAuto: false
                })
            });

            if (response.ok) {
                setMessage(` Arrosage lancé pour ${duration}s`);
            } else {
                setMessage(` Erreur: ${response.statusText}`);
            }
        } catch (error) {
            setMessage(` Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
            <h3> Contrôle d'Arrosage</h3>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Durée (secondes):
                    <input
                        type="number"
                        min="1"
                        max="120"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        style={{ marginLeft: '10px', width: '60px' }}
                    />
                </label>
            </div>

            <button
                onClick={handleWater}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: loading ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? '⏳ Chargement...' : ' Arroser'}
            </button>

            {message && (
                <div style={{ marginTop: '10px', color: message.includes('') ? 'red' : 'green' }}>
                    {message}
                </div>
            )}
        </div>
    );
}
import { useWebSocket } from '../hooks/useWebSocket';

const RASPI_WS_URL = 'http://10.0.3.171:3001';

export function PlantMonitor() {
    const { data, connected } = useWebSocket(RASPI_WS_URL);
    const { lastReading, alerts, equipment } = data;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                Status: {connected ? ' Connecté' : ' Déconnecté'}
            </div>

            {lastReading && (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h2> État Actuel (LIVE)</h2>
                    <p> Température: {lastReading.temperature}°C</p>
                    <p> Humidité: {lastReading.humidity}%</p>
                    <p> Soil: {lastReading.soil_humidity}%</p>
                    <p> {new Date(lastReading.timestamp).toLocaleString('fr-FR')}</p>
                </div>
            )}

            {alerts.length > 0 && (
                <div style={{ border: '2px solid red', padding: '10px', marginBottom: '10px', backgroundColor: '#ffe6e6' }}>
                    <h3> Alertes ({alerts.length})</h3>
                    {alerts.slice(0, 5).map((alert: any) => (
                        <div key={alert.id} style={{ padding: '5px', color: 'red', borderBottom: '1px solid #ddd' }}>
                            <strong>{alert.type}:</strong> {alert.message}
                        </div>
                    ))}
                </div>
            )}

            {equipment.length > 0 && (
                <div style={{ border: '1px solid blue', padding: '10px' }}>
                    <h3> Équipements</h3>
                    {equipment.map((eq: any) => (
                        <div key={eq.id} style={{ padding: '5px' }}>
                            {eq.name}: <strong style={{ color: eq.status === 'on' ? 'green' : 'gray' }}>{eq.status}</strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
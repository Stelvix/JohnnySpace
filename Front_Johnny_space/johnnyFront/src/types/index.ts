export interface Reading {
    id: string;
    temperature: number;
    humidity: number;
    soil_humidity: number;
    is_valid: boolean;
    timestamp: string;
}

export interface Alert {
    id: string;
    type: string;
    severity: 'warning' | 'error' | 'critical';
    message: string;
    reading_id: string;
    block_auto_watering: boolean;
    acknowledged: boolean;
    created_at: string;
}

export interface Equipment {
    id: string;
    name: string;
    type: string;
    status: 'on' | 'off' | 'ready';
    last_checked: string;
}

export interface WebSocketData {
    lastReading: Reading | null;
    alerts: Alert[];
    equipment: Equipment[];
}

export interface WebSocketMessage<T = any> {
    type: 'INITIAL_DATA' | 'NEW_READING' | 'NEW_ALERT' | 'EQUIPMENT_UPDATE' | 'PING' | 'PONG' | 'GET_STATUS' | 'STATUS_UPDATE';
    data: T;
}
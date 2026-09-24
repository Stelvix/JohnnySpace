import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export interface WebSocketContextType {
    data: any;
    connected: boolean;
    send: (message: any) => void;
}

export function useWebSocket(url: string = 'http://10.0.3.171:3001'): WebSocketContextType {
    const [data, setData] = useState<any>({ lastReading: null, alerts: [] });
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            console.log('Socket.io connecte');
            setConnected(true);
        });

        socket.on('INITIAL_DATA', (message: any) => {
            console.log('Donnees initiales recues');
            setData({
                lastReading: message.lastReading,
                alerts: message.alerts,
                equipment: message.equipment
            });
        });

        socket.on('NEW_READING', (message: any) => {
            console.log('Nouvelle lecture');
            setData((prev: any) => ({
                ...prev,
                lastReading: message
            }));
        });

        socket.on('NEW_ALERT', (message: any) => {
            console.log('Nouvelle alerte');
            setData((prev: any) => ({
                ...prev,
                alerts: [message, ...prev.alerts]
            }));
        });

        socket.on('disconnect', () => {
            console.log('Socket.io deconnecte');
            setConnected(false);
        });

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [url]);

    const send = (message: any) => {
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('MESSAGE', message);
        }
    };

    return { data, connected, send };
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import BarreLaterale from './composants/BarreLaterale'
import TableauDeBord from './pages/TableauDeBord'
import AssistantVocal from './pages/AssistantVocal'
import MaPlante from './pages/Plante'
import Equipements from './pages/Equipements'
import Historique from './pages/Historique'
import { useWebSocket } from './hooks/useWebSocket'

interface WebSocketContextType {
    data: any;
    connected: boolean;
    send: (message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

function WebSocketProvider({ children }: { readonly children: ReactNode }) {
    const { data, connected, send } = useWebSocket('http://10.0.3.171:3001');

    const value = useMemo<WebSocketContextType>(() => ({
        data,
        connected,
        send
    }), [data, connected, send]);

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocketContext(): WebSocketContextType {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within WebSocketProvider');
    }
    return context;
}

export default function App() {
    return (
        <BrowserRouter>
            <WebSocketProvider>
                <div className="flex min-h-screen w-full bg-[#051424] text-[#d4e4fa]">
                    <BarreLaterale />

                    <WebSocketIndicator />

                    <Routes>
                        <Route path="/" element={<TableauDeBord />} />
                        <Route path="/ma-plante" element={<MaPlante />} />
                        <Route path="/assistant-vocal" element={<AssistantVocal />} />
                        <Route path="/equipements" element={<Equipements />} />
                        <Route path="/historique" element={<Historique />} />
                    </Routes>
                </div>
            </WebSocketProvider>
        </BrowserRouter>
    )
}

function WebSocketIndicator() {
    const { connected } = useWebSocketContext();

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 50,
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                backgroundColor: connected ? '#4edea3' : '#f44336',
                color: connected ? '#051424' : 'white',
                fontWeight: 'bold'
            }}
        >
            {connected ? 'Connecte' : 'Deconnecte'}
        </div>
    );
}
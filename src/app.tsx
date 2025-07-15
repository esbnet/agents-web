import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from './components/ui/sonner';
import { CreateRoom } from "./pages/create-room";
import { RecordRoomAudio } from './pages/record-room-audio';
import { Room } from "./pages/room";

export function App() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<CreateRoom />} />
                    <Route path="/room/:roomId" element={<Room />} />
                    <Route path="/room/:roomId/audio" element={<RecordRoomAudio />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right"
                richColors={true}
                icons={{ success: "check", error: "x", loading: "loader" }}
                closeButton={true}
            />
        </QueryClientProvider>
    )
}


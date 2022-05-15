import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingProgress from "./components/commons/LoadingProgress";
import SocketProvider from "./context/SocketContext";
import UserProvider from "./context/UserContext";

const NormalLayout = React.lazy(() => import("./layout/NormalLayout"));
const Game = React.lazy(() => import("./components/game-play/Game"));
const HomePage = React.lazy(() => import("./components/home/HomePage"));
const RoomPage = React.lazy(() => import("./components/room/RoomPage"));
const Gallery = React.lazy(() => import("./components/gallery/Gallery"));
const CreateRoom = React.lazy(() => import("./components/room/CreateRoom"));
const CollectionPage = React.lazy(
    () => import("./components/collection/Collection")
);

function App() {
    return (
        <UserProvider>
            <SocketProvider>
                <BrowserRouter>
                    <Suspense fallback={<LoadingProgress />}>
                        <Routes>
                            <Route element={<NormalLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/play" element={<Game />} />
                                <Route path="/room" element={<RoomPage />} />
                                <Route
                                    path="/create"
                                    element={<CreateRoom />}
                                />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route
                                    path="/collection"
                                    element={<CollectionPage />}
                                />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SocketProvider>
        </UserProvider>
    );
}

export default App;

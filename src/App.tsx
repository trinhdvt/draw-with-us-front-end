import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingProgress from "./components/LoadingProgress";
import SocketProvider from "./context/SocketContext";
import UserProvider from "./context/UserContext";
import {QueryClient, QueryClientProvider} from "react-query";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/home"));
const ListRoom = React.lazy(() => import("./pages/list-room"));
const CreateRoom = React.lazy(() => import("./pages/create-room"));
const CreateCollection = React.lazy(() => import("./pages/create-collection"));
const Game = React.lazy(() => import("./pages/game-play"));
const Gallery = React.lazy(() => import("./pages/gallery"));

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <SocketProvider>
                <BrowserRouter>
                    <Suspense fallback={<LoadingProgress />}>
                        <Routes>
                            <Route element={<AppLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/room" element={<ListRoom />} />
                                <Route
                                    path="/create"
                                    element={<CreateRoom />}
                                />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route
                                    path="/collection"
                                    element={<CreateCollection />}
                                />
                                <Route path="/play" element={<Game />}>
                                    <Route path=":roomId" element={<Game />} />
                                </Route>
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SocketProvider>
        </UserProvider>
    </QueryClientProvider>
);

export default App;

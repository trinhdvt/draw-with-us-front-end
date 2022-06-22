import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

import {AnimatedLoading} from "./components/LoadingScreen";
import SocketProvider from "./context/SocketContext";
import GameWrapper from "./pages/game-play";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/home"));
const ListRoom = React.lazy(() => import("./pages/list-room"));
const CreateRoom = React.lazy(() => import("./pages/create-room"));
const CreateCollection = React.lazy(() => import("./pages/create-collection"));
const Gallery = React.lazy(() => import("./pages/gallery"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => (
    <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        )}
        <SocketProvider>
            <BrowserRouter>
                <Suspense fallback={<AnimatedLoading />}>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/room" element={<ListRoom />} />
                            <Route path="/create" element={<CreateRoom />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route
                                path="/collection"
                                element={<CreateCollection />}
                            />
                            <Route
                                path="/login/fb/callback"
                                element={<HomePage />}
                            />
                        </Route>
                        <Route path="/play/:roomId" element={<GameWrapper />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </SocketProvider>
    </QueryClientProvider>
);

export default App;

import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import {AnimatedLoading} from "./components/LoadingScreen";
import GameWrapper from "./pages/game-play";
import OAuthLogin from "./pages/home/components/OAuthLogin";
import SocketWrapper from "./store/SocketStore";
import HomePage from "./pages/home";
import {useUser} from "./store/UserStore";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
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

const App = () => {
    const token = useUser(state => state.token);
    const isLoggedIn = !!token;

    return (
        <QueryClientProvider client={queryClient}>
            <SocketWrapper>
                <BrowserRouter>
                    <Suspense fallback={<AnimatedLoading />}>
                        <Routes>
                            <Route element={<AppLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/room" element={<ListRoom />} />
                                <Route
                                    path="/create"
                                    element={<CreateRoom />}
                                />
                                <Route path="/gallery" element={<Gallery />} />
                                {isLoggedIn && (
                                    <Route
                                        path="/collection"
                                        element={<CreateCollection />}
                                    />
                                )}
                                <Route
                                    path="/login/fb/callback"
                                    element={<OAuthLogin />}
                                />
                            </Route>
                            <Route
                                path="/play/:roomId"
                                element={<GameWrapper />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SocketWrapper>
        </QueryClientProvider>
    );
};

export default App;

import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";
import "./i18n/config";

import {AnimatedLoading} from "./components/LoadingScreen";
import GameWrapper from "./pages/game-play";
import OAuthLogin from "./pages/home/components/OAuthLogin";
import SocketWrapper from "./store/SocketStore";
import HomePage from "./pages/home";
import {useUser} from "./store/UserStore";
import ListRoom from "./pages/list-room";
import CreateRoom from "./pages/create-room";
import Gallery from "./pages/gallery";
import CreateCollection from "./pages/create-collection";
import AppLayout from "./layout/AppLayout";
import NotFound from "./components/NotFound";
import JoinRoom from "./pages/join-room";

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
            <GoogleOAuthProvider clientId="545452035521-leue10pl1h50n85g7r967bf43qjea24d.apps.googleusercontent.com">
                <SocketWrapper>
                    <BrowserRouter>
                        <Suspense fallback={<AnimatedLoading />}>
                            <Routes>
                                <Route element={<AppLayout />}>
                                    <Route index element={<HomePage />} />
                                    <Route
                                        path="/room"
                                        element={<ListRoom />}
                                    />
                                    <Route
                                        path="/create"
                                        element={<CreateRoom />}
                                    />
                                    <Route
                                        path="/gallery"
                                        element={<Gallery />}
                                    />
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
                                <Route path="/join" element={<JoinRoom />} />
                                <Route
                                    path="/play/:roomId"
                                    element={<GameWrapper />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </SocketWrapper>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    );
};

export default App;

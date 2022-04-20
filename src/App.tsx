import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const NormalLayout = React.lazy(() => import("./layout/NormalLayout"))
const Game = React.lazy(() => import('./components/game-play/Game'));
const HomePage = React.lazy(() => import('./components/home/HomePage'))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Page is loading ...</div>}>
                <Routes>
                    <Route element={<NormalLayout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/play" element={<Game/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;

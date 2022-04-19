import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const NormalLayout = React.lazy(() => import("./layout/NormalLayout"))
const Game = React.lazy(() => import('./components/game-play/Game'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Page is loading ...</div>}>
                <Routes>
                    <Route element={<NormalLayout/>}>
                        <Route path="/" element={<Game/>}>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;

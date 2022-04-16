import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Authentication from "./components/pages/Authentication";
import Database from './components/pages/Database';
import Storage from "./components/pages/Storage";
import Hosting from "./components/pages/Hosting";
import VPS from "./components/pages/VPS";
import {ThemeProvider} from "@mui/material";
import {appTheme} from "./AppTheme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={appTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="auth" element={<Authentication/>}/>
                    <Route path="db" element={<Database/>}/>
                    <Route path="storage" element={<Storage/>}/>
                    <Route path="hosting" element={<Hosting/>}/>
                    <Route path="vps" element={<VPS/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

reportWebVitals();

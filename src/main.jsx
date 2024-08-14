import React from 'react'
import ReactDOM from 'react-dom/client'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './index.css'
import App from './App.jsx'
import {Toaster} from "@/components/ui/sonner.jsx";
import Header from "@/components/custom/Header.jsx";
import CreateTripe from "@/pages/create-tripe/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/create-trip',
        element: <CreateTripe/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
            <Header/>
            <Toaster/>
            <RouterProvider router={router}/>
        </GoogleOAuthProvider>
    </React.StrictMode>
)

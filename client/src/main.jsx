import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserNameProvider from './Context/User.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <UserNameProvider>
    <App />
    </UserNameProvider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {useToast,ToastProvider} from "./components/Snackbar"
createRoot(document.getElementById('root')).render(
     <ToastProvider>
        <App />
     </ToastProvider>
  ,
)

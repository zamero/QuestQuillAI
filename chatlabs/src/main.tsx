import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}> <App /> </GoogleOAuthProvider>);

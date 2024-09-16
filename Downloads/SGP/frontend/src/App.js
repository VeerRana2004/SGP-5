import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { RecoilRoot } from 'recoil';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                />
            </div>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        {/* Default route redirects to /login */}
                        <Route path="/" element={<Navigate to="/login" />} />

                        {/* Login route */}
                        <Route path="/login" element={<Login />} />
                        
                        {/* Signup route */}
                        <Route path="/signup" element={<Signup />} />
                        
                        {/* Home route */}
                        <Route path="/home" element={<Home />} />

                        {/* EditorPage route with roomId */}
                        <Route path="/editor/:roomId" element={<EditorPage />} />
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    );
}

export default App;

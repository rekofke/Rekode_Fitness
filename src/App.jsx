import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Register from './components/Auth/Register'
import ClassCalander from './components/Calander/ClassCalander'
import MyBookings from './components/Booking/MyBookings'
import Navbar from './components/Common/Navbar'

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()
    if (loading) return <div>Loading...</div>
    return user ? children : <Navigate to="login" />
} 

function AppRoutes() {
    const { user }= useAuth()
    return (
        <>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><ClassCalendar /></ProtectedRoute>} />
                <Route path='/my-bookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            </Routes>
        </div>
    

    )
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider></AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
import { BrowseRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Authprovider, useAuth } from './components/Auth/Login';
import Login from './components/Auth/Register';
import ClassCalander from './components/Calander/ClassCalander';
import MyBookings from './components/Booking/MyBookings';
import NavBar from './components/Common/Navbar';

//  ProtectedRoute component ensures that only authenticated users can access certain routes
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to ="/login" />
}

//Navbar component and routes
function AppRoutes() {
    const { user } = useAuth();
return {
    <>
    <Navbar />
    <Routes>
    <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<ProtectedRoute><ClassCalander /></ProtectedRoute} />
        <Route path='/my-bookings' element={<ProtectedRoute></ProtectedRoute> />} />
    </Routes>
    </>
};
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
        
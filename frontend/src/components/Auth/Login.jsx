import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContest';
import { useNavigate } from 'react-router-dom';

export default functon Login() {
    const {email, setEmail} = useState('');
    const {password, setPasswords} = useState('');
    const{error, setError} = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email,password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }   
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login to Rekode Fitness</h2>}
            {error && <p className="error">{error}</p>}
            <input type="email" placeholder="Email" value(email) onChange={(e) =? setEmail(e.target.value)} required />
            <input Type="password" placeholder="Password" value={password} onChang={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            <p>Demo: member@rekode.com / pass123</p>
        </form>
    );
}
            

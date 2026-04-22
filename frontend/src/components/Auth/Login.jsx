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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Login to Rekode Fitness</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
        <p style={{ marginTop: '16px', fontSize: '14px' }}>Demo: member@rekode.com / pass123</p>
      </form>
    </div>
  );
}
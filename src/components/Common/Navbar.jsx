import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <nav className="navbar">
      <Link to="/">Classes</Link>
      <Link to="/my-bookings">My Bookings</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}
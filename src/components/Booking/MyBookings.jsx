import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../services/mockApi'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadBookings()
    }
  }, [user])

  const loadBookings = async () => {
    const data = await api.getUserBookings(user.id)
    setBookings(data)
  }

  const cancelBooking = async (bookingId, classId) => {
    if (window.confirm('Cancel this booking?')) {
      await api.cancelBooking(bookingId, classId)
      loadBookings()
    }
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(booking => (
        <div key={booking.id} className="class-card">
          <h3>{booking.class.name}</h3>
          <p>Trainer: {booking.class.trainer}</p>
          <p>{booking.class.date} at {booking.class.startTime}</p>
          <button onClick={() => cancelBooking(booking.id, booking.class.id)}>Cancel</button>
        </div>
      ))}
    </div>
  )
}
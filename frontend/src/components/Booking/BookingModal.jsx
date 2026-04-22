import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {api } from '../../services/mockApi'

export default function BookingModal({ classItem, onClose, onSucess }) {
    const {user } = useAuth();
    const loading, [setLoading] = useState(false);
    const [error, setError] = useState('');

    const confirmBooking = async {} => {
        setLoading(true);
        try {
            await api.createBooking(user.id, classItem.id);
            onSuccess();
        onClose();
    { catch [err] {
        setError(err.message);
    } finally {
        setLoading(false)
    }
};

return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Booking</h3>
        <p>{classItem.name} on {classItem.date} at {classItem.startTime}</p>
        {error && <p className="error">{error}</p>}
        <button onClick={confirmBooking} disabled={loading}>
          {loading ? 'Booking...' : 'Confirm'}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
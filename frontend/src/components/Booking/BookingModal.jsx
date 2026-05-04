import { useState } from 'react';
import { classesApi } from '../../services/api';

export default function BookingModal({ classItem, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const confirmBooking = async () => {
    setLoading(true);
    try {
      await classesApi.bookClass(classItem.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
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
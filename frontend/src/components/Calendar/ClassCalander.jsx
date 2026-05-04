import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { classesApi } from '../../services/api';
import BookingModal from '../Booking/BookingModal';

export default function ClassCalendar() {
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadClasses();
  }, [selectedDate]);

  const loadClasses = async () => {
    try {
      const res = await classesApi.getClasses(selectedDate);
      setClasses(res.data);
    } catch (err) {
      console.error('Failed to load classes', err);
    }
  };

  const handleBook = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <div>
      <h2>Rekode Fitness Classes</h2>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={(e) => setSelectedDate(e.target.value)} 
      />
      <div className="class-list">
        {classes.map(cls => (
          <div key={cls.id} className="class-card">
            <h3>{cls.name}</h3>
            <p>Trainer: {cls.trainer}</p>
            <p>{cls.startTime} - {cls.endTime}</p>
            <p>Spots: {cls.capacity - cls.bookedCount} / {cls.capacity}</p>
            {user && (
              <button onClick={() => handleBook(cls)} disabled={cls.bookedCount >= cls.capacity}>
                {cls.bookedCount >= cls.capacity ? 'Full' : 'Book'}
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedClass && (
        <BookingModal 
          classItem={selectedClass} 
          onClose={() => setSelectedClass(null)} 
          onSuccess={loadClasses}
        />
      )}
    </div>
  );
}
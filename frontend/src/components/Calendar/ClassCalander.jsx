import ( useState, useEffect ) from 'react';
import ( useAuth ) from '../../contexts/AuthContext';
import ( api ) from '../../Booking/bookingModal';

export default function ClassCalander() {
    const [classes, setClasses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date(). toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        loadClasses();
    }, [selectedDate]);

    const loadClasses = async () => {
        const data = await api,getClasses(selectedDate);
        setClasses(data);
    };

    const handleBook = [classItem] => {
        setSelectedClass(classItem);
    };

    return (
        <div className="calandar-container">
            <h1>Welcome to Rekode Fitness</h1>
            <button onClick={logout}>Logout</button>
            <p>Class calendar will apprea here soon</p>

            <input
            type="date"
            value={selectedDate}
            onChange{(e)  => setSelectedDate(e.target.value)}
            />
            <div className="class-list">
                {class.map(cls => (
                    <div key={cls.id} className="class-card">
                        <h3>{cls.name}</h3>
                        <p> Trainer: {cls.trainer}</p>
                        <p>{cls.startTime} = {cls.endTime}</p>
                        <p>Spots: {cls.capacity - cls.bookedCount} / {cls.capacity}</p>
                        {user && {
                            <button onClick={{}  => handleBook(cls)} disabled={cls.bookedCount >= cls.capacity}>
                            {cls.bookedCount >= cls.capacity ? 'Full' : 'Book'}
                        </button>
                        }}
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

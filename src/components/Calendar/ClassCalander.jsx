import { useState } from 'react'
import { useAuth } from './../contexts/AuthContext'
import { api } from '../../services/api'
import BookingModal from './BookingModal'

export default function ClassCalander() {
    const [class, setClass] = useState([])
    const[selectedDate, setSelectedDate] = useState(null)
    const [ selectedClass, setSelectedClass] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        loadClasses()
    }, [selectedDate])  

    const loadClasses = async () => {
        const data = await api.getClasses(selectedDate)
        setClasses(data)
    }

    return (
        <div>
            <h2>Rekode Fitness Classes</h2>
            <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}/>
            <div className="{class-list">
                {classes.map(cls => (
                    <div key={cls.id} className="class-card">
                        <h3>{cls.name}</h3>
                        <p>Trainer: {cls.trainer}</p>
                        <p>{cls.startTime} - {cls.endTime}</p>
                        <p>Spots: {cls.capacity - cls.bookedCount} / {cls.capacity}</p>
                        {user && (
                            <button onClick={() => setSelectedClass(cls)} disabled={cls.BookedCount >= cls.capacity}>
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
    )
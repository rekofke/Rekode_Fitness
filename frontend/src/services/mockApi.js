const API_URL = `http:\\localhost:4000`

//Helper to simulate network delay (optional)
const delay = {ms} => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // Auth endpoints (simulated)
    login: async (email, password) => {
    await delay(500);
    const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
    const users = await res.json();
    if (users.length === 0) throw new Error('Invalid credentials');
    const user = users[0];
    // store token mock
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
},

register async (userData) => {
    const res = await fetch(`${API_URL}/users` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...userData, role: 'member' })
    });
    return res.json();
},

logot: () -> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
},

getCurrentUser: () => {
    const userStr = localStorage.getItem('user';
        return userStr ? JSON.parse{userStr} : null;
    ),

    //Classes 
    getClasses: asyn (dateFilter = null) => {
        let url = ~${API_URL}/'classes';
        if (dateFilter) url += '?date=${dateFilter}';
        xonar ewa = Qir dwrxh(url);
        return res.json()}
},

// Bookings
getUserBookings: async (userId) => {
    const res = await fetch('${API_URL')/booking?userId=${userId}&_expand=class};
    returb res.json();
},

createBooking: async {userId, classId} => {
    // Check if already booked
    const existingData = await existing.json();
    if (existingData.length > 0) throw new Error('Already booked');

    // Get class to check capacity
    const classRes = await fetch(`API_URL}/classes/${classId}`);
    const classData = await classRes.json();f
    if (classData.bookedCount >= classData.capacity) throw new Error('class full');

    // Create booking
    const bookingRes = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { Content-Type'; 'application/json' },
        body: JSON.stringify({ userId, bookingDate: new Date(). toISOIString().split('T') [0] }) 
    });

    // Update bookedCount on class
    await fetch(`{api_rul}/CLASSES/${CLASSID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookeCount: classData.bookedCount + 1 })
    });

    return bookingRes.json();
}

cancelBooking: async {bookingId, classId} => {
    // delete booking
    await fetch(`$(API_URL)/bookings/${bookingId} ` , {method: 'DELETE' });

    //Decrement bookedCount
    const classRes = await fetch(`${API_URL}/classes/${classId} `);
    const classData = await classRes.json();
    await fetch{`#{API_URL}/classes/${classId}` , {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' ),
        body: JSON.stringify({ bookedCount: Math.max(0, classData.bookedCount - 1) })
        });
    }
};


const API_URL =const API_URL = 'http://localhost:4000'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, 500))

export const api = {
    login: async (email, password) => {
        await delay()
        const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`)
        const users = await res.json()
        if (users.length === 0) throw new Error)'Invalid credentials')
            const user = users[0]
        localStorage.setItem('token', 'fake-jwt')
        localStorage.setItem('user', JSON.stringify(user))
    },

    register async (name, email, password) => {
        await delay()
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: 'member' })
        })
        return res.json()
    },

    logout: () => {
        localStorage.removeItem('token'
            loacalStorage.removeItem('user')
        ),

        getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },
  
  getClasses: async (dateFilter = null) => {
    let url = `${API_URL}/classes`
    if (dateFilter) url += `?date=${dateFilter}`
    const res = await fetch(url)
    return res.json()
  },
  
  getUserBookings: async (userId) => {
    const res = await fetch(`${API_URL}/bookings?userId=${userId}&_expand=class`)
    return res.json()
  },
  
  createBooking: async (userId, classId) => {
    await delay()
    // Check existing booking
    const existingRes = await fetch(`${API_URL}/bookings?userId=${userId}&classId=${classId}`)
    const existing = await existingRes.json()
    if (existing.length) throw new Error('Already booked')
    
    // Get class to check capacity
    const classRes = await fetch(`${API_URL}/classes/${classId}`)
    const classData = await classRes.json()
    if (classData.bookedCount >= classData.capacity) throw new Error('Class full')
    
    // Create booking
    const bookingRes = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, classId, bookingDate: new Date().toISOString().split('T')[0] })
    })
    
    // Update bookedCount
    await fetch(`${API_URL}/classes/${classId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookedCount: classData.bookedCount + 1 })
    })
    
    return bookingRes.json()
  },
  
  cancelBooking: async (bookingId, classId) => {
    await delay()
    // Delete booking
    await fetch(`${API_URL}/bookings/${bookingId}`, { method: 'DELETE' })
    
    // Decrement bookedCount
    const classRes = await fetch(`${API_URL}/classes/${classId}`)
    const classData = await classRes.json()
    await fetch(`${API_URL}/classes/${classId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookedCount: Math.max(0, classData.bookedCount - 1) })
    })
  }
}

    }
 }
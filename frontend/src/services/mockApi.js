const API_URL = 'http://localhost:4000'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  login: async (email, password) => {
    await delay(500)
    const res = await fetch(
      `${API_URL}/users?email=${email}&password=${password}`
    )
    const users = await res.json()
    if (users.length === 0) throw new Error('Invalid credentials')
    const user = users[0]
    localStorage.setItem('token', 'fake-jwt-token')
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

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

  getUserBookings: async userId => {
    const res = await fetch(
      `${API_URL}/bookings?userId=${userId}&_expand=class`
    )
    return res.json()
  },

  createBooking: async (userId, classId) => {
    const existing = await fetch(
      `${API_URL}/bookings?userId=${userId}&classId=${classId}`
    )
    const existingData = await existing.json()
    if (existingData.length > 0) throw new Error('Already booked')

    const classRes = await fetch(`${API_URL}/classes/${classId}`)
    const classData = await classRes.json()
    if (classData.bookedCount >= classData.capacity)
      throw new Error('Class full')

    await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        classId,
        bookingDate: new Date().toISOString().split('T')[0]
      })
    })

    await fetch(`${API_URL}/classes/${classId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookedCount: classData.bookedCount + 1 })
    })
  },

  cancelBooking: async (bookingId, classId) => {
    await fetch(`${API_URL}/bookings/${bookingId}`, { method: 'DELETE' })
    const classRes = await fetch(`${API_URL}/classes/${classId}`)
    const classData = await classRes.json()
    await fetch(`${API_URL}/classes/${classId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookedCount: Math.max(0, classData.bookedCount - 1)
      })
    })
  }
}

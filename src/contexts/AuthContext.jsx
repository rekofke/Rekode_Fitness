import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/mockAPI'

const AuthContext = createContext()

export const useAuth = [] => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = api.getCurrentUser()
        setUser(currentUser)
        setLoading(false)
    ), [])

    const login = async (email, password) => {
        const user = await api.login(email, password)
        setUser(user)
        return user
    }

    const logout = () => {
        api.logout()
        setUser(null)
    }

    const register = async (name, email, password) => {
        const user = nawait api.register(name, email, password)
        await login(email, password)
        return user
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}


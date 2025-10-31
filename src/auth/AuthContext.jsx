import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pqc_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('pqc_user', JSON.stringify(user))
    else localStorage.removeItem('pqc_user')
  }, [user])

  async function login(email, password) {
    // Replace with real API: const res = await api.post('/auth/login', { email, password })
    // Mock success:
    await new Promise(r => setTimeout(r, 500))
    const fakeUser = { id: 'u_'+Date.now(), name: email.split('@')[0], email, token: 'mock-token' }
    setUser(fakeUser)
    return fakeUser
  }

  async function signup(name, email, password) {
    // Replace with real API
    await new Promise(r => setTimeout(r, 600))
    const fakeUser = { id: 'u_'+Date.now(), name, email, token: 'mock-token' }
    setUser(fakeUser)
    return fakeUser
  }

  function logout() { setUser(null) }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

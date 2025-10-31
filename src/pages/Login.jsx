import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('student@example.com')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password)
      nav('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{maxWidth:480, margin:'40px auto'}}>
      <h2 style={{marginTop:0}}>Login</h2>
      <p style={{color:'#9ca3af'}}>Access your dashboard to upload assignments and check originality.</p>
      {error && <div className="badge fail" style={{marginBottom:10}}>{error}</div>}
      <form className="stack" onSubmit={handleLogin}>
        <label className="stack">
          <span>Email</span>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="stack">
          <span>Password</span>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <div style={{marginTop:12}}>
        No account? <Link to="/signup">Create one</Link>
      </div>
    </div>
  )
}

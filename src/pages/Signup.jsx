import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(name, email, password)
      nav('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{maxWidth:520, margin:'40px auto'}}>
      <h2>Create your account</h2>
      <p style={{color:'#9ca3af'}}>Sign up to securely upload assignments and get feedback.</p>
      {error && <div className="badge fail" style={{marginBottom:10}}>{error}</div>}
      <form className="stack" onSubmit={handleSignup}>
        <label className="stack">
          <span>Full name</span>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label className="stack">
          <span>Email</span>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="stack">
          <span>Password</span>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
        </label>
        <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      <div style={{marginTop:12}}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

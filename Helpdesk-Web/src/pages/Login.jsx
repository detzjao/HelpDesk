import { useState } from 'react'
import { request } from '../services/api'

export default function Login({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const res = await request('/auth/login', 'POST', { email, password })

    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">HelpDesk</h2>

        <input className="w-full mb-3 p-2 border rounded" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input type="password" className="w-full mb-4 p-2 border rounded" placeholder="Senha"
          onChange={e => setPassword(e.target.value)} />

        <button onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
      </div>
    </div>
  )
}
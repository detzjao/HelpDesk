import { useEffect, useState } from 'react'
import { request } from '../services/api'
import StatusBadge from '../components/StatusBadge'

export default function Tickets({ token }) {
  const [tickets, setTickets] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  async function loadTickets() {
    const res = await request(`/tickets?status=${statusFilter}`, 'GET', null, token)
    setTickets(res.data)
  }

  async function createTicket() {
    await request('/tickets', 'POST', { title, description }, token)
    setTitle('')
    setDescription('')
    loadTickets()
  }

  async function updateStatus(id, status) {
    await request(`/tickets/${id}`, 'PUT', { status }, token)
    loadTickets()
  }

  async function deleteTicket(id) {
    await request(`/tickets/${id}`, 'DELETE', null, token)
    loadTickets()
  }

  useEffect(() => {
    loadTickets()
  }, [statusFilter])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Chamados ({tickets.length})
      </h1>

      {/* filtro */}
      <select
        className="mb-4 p-2 border rounded"
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="aberto">Aberto</option>
        <option value="andamento">Andamento</option>
        <option value="fechado">Fechado</option>
      </select>

      {/* criar */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex gap-2">
          <input className="border p-2 rounded flex-1"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)} />

          <input className="border p-2 rounded flex-1"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)} />

          <button onClick={createTicket}
            className="bg-green-600 text-white px-4 rounded">
            Criar
          </button>
        </div>
      </div>

      {/* lista */}
      <div className="grid gap-4">
        {tickets.map(t => (
          <div key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between">

            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
              <StatusBadge status={t.status} />
            </div>

            <div className="flex gap-2">
              <button onClick={() => updateStatus(t.id, 'andamento')}
                className="bg-yellow-500 text-white px-2 rounded">
                →
              </button>

              <button onClick={() => updateStatus(t.id, 'fechado')}
                className="bg-green-600 text-white px-2 rounded">
                ✓
              </button>

              <button onClick={() => deleteTicket(t.id)}
                className="bg-red-500 text-white px-2 rounded">
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default function StatusBadge({ status }) {
  const colors = {
    aberto: 'bg-blue-500',
    andamento: 'bg-yellow-500',
    fechado: 'bg-green-600'
  }

  return (
    <span className={`text-white px-2 py-1 rounded text-xs ${colors[status]}`}>
      {status}
    </span>
  )
}
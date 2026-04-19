export default function Dashboard({ token, setToken }) {
  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-60 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">HelpDesk</h2>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 text-white p-2 rounded"
        >
          Sair
        </button>
      </div>

      <div className="flex-1 p-6">
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}
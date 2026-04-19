const API_URL = 'http://localhost:3000'

export async function request(endpoint, method = 'GET', body, token) {
  const res = await fetch(API_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token })
    },
    body: body ? JSON.stringify(body) : undefined
  })

  return res.json()
}
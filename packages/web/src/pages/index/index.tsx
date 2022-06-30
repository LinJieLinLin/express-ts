import React, { useEffect, useState } from 'react'

const Index: React.FC = () => {
  const logout = () => {
    localStorage.setItem('tk', '')
    window.location.href = '#/login'
  }
  const [user, setUser] = useState<{ [key: string]: string }>({})
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('USER') || '{}')
    setUser(u)
  }, [])
  return (
    <div className="ta-c pIndex">
      <p>hello {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
export default Index

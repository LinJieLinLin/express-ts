import React from 'react'
import { Login } from '../../api'

const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const login = async () => {
    const data = {
      username,
      password,
    }
    const res = await Login(data)?.catch((err) => {
      console.error('Login', err)
    })
    if (res) {
      localStorage.setItem('USER', JSON.stringify(res))
      window.location.href = window.location.pathname
    }
  }
  return (
    <div className="flex-center full-h-vh">
      <div className="login-input ta-c">
        <input
          type="text"
          placeholder="Please enter user name"
          value={username}
          onChange={(val) => {
            setUsername(val.target.value)
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Please enter password"
          value={password}
          onChange={(val) => {
            setPassword(val.target.value)
          }}
        />
        <div className="mg-t10">
          <button onClick={login}>login</button>
        </div>
      </div>
    </div>
  )
}
export default LoginPage

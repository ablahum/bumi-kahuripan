import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import bg from '../../assets/bg.png'
import { login } from '../../apis/auth'
import { LoginForm } from '../../components'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  if (localStorage.getItem('user')) return <Navigate to='/' />

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = user

    try {
      const res = await login({ email, password })

      if (res.data.message === 'Email atau password salah') {
        alert(res.data.message)
      } else if (res.data.message === 'Anda tidak terdaftar. Silakan register terlebih dahulu') {
        alert(res.data.message)
        navigate('/register')
      } else {
        alert(res.data.message)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <Title>BUMI KAHURIPAN</Title>
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </Wrapper>
  )
}

export default Login

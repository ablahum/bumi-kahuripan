import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import bg from '../../assets/bg.png'
import { register } from '../../apis/auth'
import { RegisterForm } from '../../components'

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

const Register = () => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()
  if (localStorage.getItem('user')) return <Navigate to='/' />

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password, confirmPassword } = newUser

    try {
      if (password !== confirmPassword) {
        alert('Password tidak sama')
      } else {
        const res = await register({ email, password })

        alert(res.data.message)
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <Title>BUMI KAHURIPAN</Title>
      <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </Wrapper>
  )
}

export default Register

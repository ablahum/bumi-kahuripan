import styled from 'styled-components'
import { Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const FormWrapper = styled(Form)`
  margin: auto;
  padding: 2rem;
  width: 40%;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
`

const Main = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`

const Login = () => {
  const [user, setUser] = useState({
    email: 'asd',
    password: 'asd',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = user

    try {
      const res = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      })

      alert(res.data.message)
      localStorage.setItem('user', res.data.user)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Main>
      <Container>
        <h1 className='text-center m-0 fw-bold'>BUMI KAHURIPAN</h1>
        <h2 className='text-center mb-5'>Dashboard App</h2>
        <FormWrapper onSubmit={handleSubmit}>
          <h4 className='text-center mb-2 fw-bold'>MASUK</h4>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label className='fw-bold mb-1'>Email</Form.Label>
            <Form.Control type='email' placeholder='Masukkan email Anda' name='email' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicPassword'>
            <Form.Label className='fw-bold mb-1'>Password</Form.Label>
            <Form.Control type='password' placeholder='Masukkan password Anda' name='password' onChange={handleChange} />
          </Form.Group>
          <p className='text-center mt-3 mb-4'>
            Belum punya akun?{' '}
            <Link to='/register' className='text-decoration-none'>
              Daftar
            </Link>
          </p>
          <Button variant='danger' type='submit' className='w-100 fw-bold'>
            MASUK
          </Button>
        </FormWrapper>
      </Container>
    </Main>
  )
}

export default Login

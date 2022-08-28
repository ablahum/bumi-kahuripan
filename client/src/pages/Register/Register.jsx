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

const Register = () => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

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
        const res = await axios.post('http://localhost:4000/auth/register', {
          email,
          password,
        })

        alert(res.data.message)
        navigate('/login')
      }
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
          <h4 className='text-center mb-2 fw-bold'>BUAT AKUN BARU</h4>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label className='fw-bold mb-1'>Email</Form.Label>
            <Form.Control type='email' placeholder='Masukkan email Anda' name='email' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicPassword'>
            <Form.Label className='fw-bold mb-1'>Password</Form.Label>
            <Form.Control type='password' placeholder='Masukkan password Anda' name='password' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='fw-bold mb-1'>Ulangi password</Form.Label>
            <Form.Control type='password' placeholder='Masukkan password lagi' name='confirmPassword' onChange={handleChange} />
          </Form.Group>
          <p className='text-center mt-3 mb-4'>
            Sudah punya akun?{' '}
            <Link to='/login' className='text-decoration-none'>
              Masuk
            </Link>
          </p>
          <Button variant='danger' type='submit' className='w-100 fw-bold'>
            DAFTAR
          </Button>
        </FormWrapper>
      </Container>
    </Main>
  )
}

export default Register

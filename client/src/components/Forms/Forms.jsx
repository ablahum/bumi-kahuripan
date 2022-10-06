import { Button, Select, Form as FormAntd, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const { Option } = Select

export const Form = ({ handleChange, roomType, dayType }) => {
  return (
    <FormAntd name='basic' labelCol={{ span: 5 }} wrapperCol={{ span: 19, offset: 1 }}>
      <FormAntd.Item
        label='Nama'
        rules={[
          {
            required: true,
            message: 'Silahkan masukkan nama pengunjung',
          },
        ]}
      >
        <Input name='name' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item label='Asal'>
        <Input name='origin' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item
        label='Foto KTP'
        rules={[
          {
            required: true,
            message: 'Silahkan masukkan foto KTP',
          },
        ]}
      >
        <Upload name='ktp' onChange={handleChange}>
          <Button icon={<UploadOutlined />}>Upload KTP</Button>
        </Upload>
      </FormAntd.Item>

      <FormAntd.Item
        label='Tipe Kamar'
        rules={[
          {
            required: true,
            message: 'Silahkan masukkan tipe kamar',
          },
        ]}
      >
        <Select name='roomType' onChange={handleChange}>
          {roomType.map((type) => (
            <Option value={type._id} key={type._id}>
              {type.name} - <span>{type.price}</span>
            </Option>
          ))}
        </Select>
      </FormAntd.Item>

      <FormAntd.Item
        label='Tipe Hari'
        rules={[
          {
            required: true,
            message: 'Silahkan masukkan tipe hari',
          },
        ]}
      >
        <Select name='dayType' onChange={handleChange}>
          {dayType.map((type) => (
            <Option value={type._id} key={type._id}>
              {type.name} - <span>{type.price}</span>
            </Option>
          ))}
        </Select>
      </FormAntd.Item>

      {/* <Button htmlType='submit'>Submit</Button> */}
    </FormAntd>
  )
}

const FormWrapper = styled(FormAntd)`
  margin-top: 1.5rem;
  padding: 2rem;
  width: 30rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
  background-color: #fff;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const LoginForm = ({ handleChange, handleSubmit }) => {
  return (
    <FormWrapper layout='vertical'>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>MASUK</h2>

      <FormAntd.Item label='Email'>
        <Input placeholder='Masukkan email Anda' name='email' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item label='Password'>
        <Input.Password placeholder='Masukkan password Anda' name='password' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item style={{ marginBottom: '.75rem' }}>
        <p style={{ textAlign: 'center', margin: '0', fontWeight: '500' }}>
          Belum punya akun?{' '}
          <Link to='/register' className='text-decoration-none'>
            <span style={{ fontWeight: '700' }}>Daftar</span>
          </Link>
        </p>
      </FormAntd.Item>

      <FormAntd.Item style={{ margin: '0' }}>
        <Button type='danger' block onClick={handleSubmit}>
          MASUK
        </Button>
      </FormAntd.Item>
    </FormWrapper>
  )
}

export const RegisterForm = ({ handleChange, handleSubmit }) => {
  return (
    <FormWrapper layout='vertical'>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>DAFTAR AKUN BARU</h2>

      <FormAntd.Item label='Email'>
        <Input placeholder='Masukkan email Anda' name='email' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item label='Password'>
        <Input.Password placeholder='Masukkan password Anda' name='password' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item label='Ulangi password' style={{ marginBottom: '.75rem' }}>
        <Input.Password placeholder='Masukkan password lagi' name='confirmPassword' onChange={handleChange} />
      </FormAntd.Item>

      <FormAntd.Item style={{ marginBottom: '.75rem' }}>
        <p style={{ textAlign: 'center', margin: '0', fontWeight: '500' }}>
          Sudah punya akun?{' '}
          <Link to='/login' className='text-decoration-none'>
            <span style={{ fontWeight: '700' }}>Masuk</span>
          </Link>
        </p>
      </FormAntd.Item>

      <FormAntd.Item style={{ margin: '0' }}>
        <Button type='danger' block onClick={handleSubmit}>
          DAFTAR
        </Button>
      </FormAntd.Item>
    </FormWrapper>
  )
}

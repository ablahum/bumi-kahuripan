import { Button, Layout, Menu } from 'antd'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { logout } from '../../apis/auth'
import styled from 'styled-components'

const { Header, Sider, Content, Footer } = Layout

const Logo = styled.h2`
  margin: 1rem;
  color: #ff4d4f;
`

const HeaderWrapper = styled(Header)`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`

const ContentWrapper = styled(Content)`
  margin: 2rem;
  background-color: #fff;
  padding: 1.5rem;
`

const FooterWrapper = styled(Footer)`
  background-color: #fff;
  text-align: center;
  padding: 1rem;
`

const menuItem = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'dashboard',
  },
  {
    key: '2',
    icon: <SettingOutlined />,
    label: 'pengaturan',
  },
]

const LayoutApp = ({ items }) => {
  if (!localStorage.getItem('user')) return <Navigate to='/login' />
  const user = JSON.parse(localStorage.getItem('user'))
  const userEmail = user.email

  const handleLogout = async () => {
    try {
      const res = await logout()

      alert(res.data.message)
      localStorage.removeItem('user')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <Sider breakpoint='lg' collapsedWidth='0'>
        <Logo>BUMI KAHURIPAN</Logo>

        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={menuItem} style={{ textTransform: 'uppercase' }} />
      </Sider>

      <Layout style={{ minHeight: '100vh' }}>
        <HeaderWrapper>
          <h3 style={{ margin: '0', fontWeight: '400' }}>
            MASUK SEBAGAI: <span style={{ fontWeight: '800' }}>{userEmail}</span>
          </h3>
          <Button type='primary' danger onClick={handleLogout}>
            KELUAR
          </Button>
        </HeaderWrapper>

        <ContentWrapper>{items}</ContentWrapper>

        <FooterWrapper>Bumi Kahuripan ©2022 Created by ablahum</FooterWrapper>
      </Layout>
    </Layout>
  )
}

export default LayoutApp

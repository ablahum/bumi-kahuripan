import { Button, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import styled from 'styled-components'
import { Fade } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

const Trigger = styled(GiHamburgerMenu)`
  font-size: 1.5rem;
  margin-left: 1.5rem;
  transition: color 0.3s;
  cursor: pointer;

  :hover {
    color: #dc3545;
  }
`

const LayoutApp = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const { Header, Sider, Content } = Layout
  const user = localStorage.getItem('user')

  if (!localStorage.getItem('token')) return <Navigate to='/login' />

  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <Layout className='vh-100'>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-light shadow'>
        <Fade in={!collapsed} className='m-3'>
          <div id='example-fade-text'>
            <h4 className='text-danger m-0 fw-bold'>
              <span className='fw-normal'>BUMI</span> KAHURIPAN
            </h4>
          </div>
        </Fade>
        <Menu mode='inline' defaultSelectedKeys={['1']} className='fs-6'>
          <Menu.Item key={1} icon={<AiFillHome className='fs-5' />}>
            <Link to='/'>DASBOR</Link>
          </Menu.Item>
          <Menu.Item key={2} icon={<AiFillSetting className='fs-5' />}>
            <Link to='/setting'>PENGATURAN</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='bg-light shadow d-flex justify-content-between align-items-center p-0'>
          <Trigger onClick={() => setCollapsed(!collapsed)} />
          <div className='d-flex align-items-center'>
            <p className='m-0'>
              MASUK SEBAGAI:<span className='fs-5 mx-3 fw-bold'>{user}</span>
            </p>
            <Button type='primary' danger className='me-4 rounded bg-danger' onClick={handleLogout}>
              KELUAR
            </Button>
          </div>
        </Header>
        <Content className='m-5'>
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutApp

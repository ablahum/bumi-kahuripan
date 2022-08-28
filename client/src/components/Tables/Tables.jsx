import { Table, Space, Button } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'

const data = [
  {
    id: 1,
    name: 'John Doe',
    origin: 'Jakarta',
    ktp: 3208011234560007,
    roomType: 'AC',
    dayType: 'Weekend',
  },
  {
    id: 2,
    name: 'Jenny Doe',
    origin: 'Jakarta',
    ktp: 3208001234560007,
    roomType: 'AC',
    dayType: 'Weekend',
  },
  {
    id: 3,
    name: 'Jaime',
    origin: 'Bandung',
    ktp: 3200001234560001,
    roomType: 'Non AC',
    dayType: 'Weekend',
  },
  {
    id: 4,
    name: 'Jesse',
    origin: 'Bali',
    ktp: 5200001234560002,
    roomType: 'Non AC',
    dayType: 'Weekday',
  },
]

const Tables = () => {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get('http://localhost:4000/api/consumers')
  //     setData(res.data.consumers)
  //   }

  //   fetch()
  // }, [])

  const handleNew = () => {
    console.log('new')
  }

  const handleUpdate = () => {
    console.log('update')
  }

  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <>
      <div className='mt-4 mb-3 d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>{moment().format('dddd, DD MMMM YYYY')}</h3>
        <Button type='primary' danger className='bg-danger rounded' onClick={handleNew}>
          TAMBAH PENGUNJUNG
        </Button>
      </div>
      <Table dataSource={data}>
        <Table.Column title='NAMA' dataIndex='name' key='name' />
        <Table.Column title='ASAL' dataIndex='origin' key='origin' />
        <Table.Column title='KTP' dataIndex='ktp' key='ktp' />
        <Table.Column title='TIPE KAMAR' dataIndex='roomType' key='roomType' />
        <Table.Column title='TIPE HARI' dataIndex='dayType' key='dayType' />
        <Table.Column
          render={() => (
            <Space size='middle'>
              <Button danger className='m-0 text-dark' onClick={handleUpdate}>
                UBAH
              </Button>
              <Button danger className='m-0 text-dark' onClick={handleDelete}>
                HAPUS
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  )
}

export default Tables

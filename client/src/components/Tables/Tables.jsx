import { Table, Button, Image } from 'antd'
import { useState, useEffect } from 'react'
import { showAll, deleteOne, createOne, updateOne } from '../../apis/consumers'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/id'

import { Modal, Form } from '../../components'

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 1rem;
`

const Tables = () => {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState({
    name: '',
    origin: '',
    ktp: '',
    roomType: '',
    dayType: '',
  })
  const [dataId, setDataId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [ktp, setKtp] = useState(null)

  const [newTrigger, setNewTrigger] = useState(false)
  const [updateTrigger, setUpdateTrigger] = useState(false)
  const [deleteTrigger, setDeleteTrigger] = useState(false)

  const date = moment().format('dddd, DD MMMM YYYY')

  const handleChange = (e) => {
    if (e === 'AC' || e === 'Non AC') {
      const roomType = e

      setNewData(() => ({ ...newData, roomType }))
    } else if (e === 'Weekend' || e === 'Weekday') {
      const dayType = e

      setNewData(() => ({ ...newData, dayType }))
    } else if (e.file) {
      const ktp = e.file.originFileObj

      setNewData(() => ({ ...newData, ktp }))
    } else {
      setNewData(() => ({ ...newData, [e.target.name]: e.target.value }))
    }
  }

  const setUpdate = (params) => {
    setUpdateTrigger(true)
    setDataId(params)
  }

  const setDelete = (params) => {
    setDeleteTrigger(true)
    setDataId(params)
  }

  useEffect(() => {
    showConsumers()
  }, [])

  const showConsumers = async () => {
    try {
      const res = await showAll()

      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const createConsumer = async () => {
    try {
      const res = await createOne(newData)

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const updateConsumer = async () => {
    try {
      const res = await updateOne(dataId, newData)

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteConsumer = async () => {
    try {
      const res = await deleteOne(dataId)

      console.log(res)
      showAll()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <TitleWrapper>
        <h3 style={{ margin: '0' }}>{date}</h3>

        {/* <Button danger onClick={() => console.log(dataId)}> */}
        <Button danger onClick={() => setNewTrigger(true)}>
          TAMBAH PENGUNJUNG
        </Button>
      </TitleWrapper>

      <Table dataSource={data}>
        <Table.Column title='NO' dataIndex='no' key='no' />
        <Table.Column title='NAMA' dataIndex='name' key='name' />
        <Table.Column title='ASAL' dataIndex='origin' key='origin' />
        <Table.Column
          title='KTP'
          dataIndex='ktp'
          key='ktp'
          render={(image) => (
            <>
              <Button onClick={() => setVisible(true)}>Lihat KTP</Button>
              <Image
                width={200}
                style={{
                  display: 'none',
                }}
                src={`http://localhost:4000/public/${image}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                preview={{
                  visible,
                  src: `http://localhost:4000/public/${image}`,
                  onVisibleChange: (value) => {
                    setVisible(value)
                  },
                }}
              />
            </>
          )}
        />
        <Table.Column title='TIPE KAMAR' dataIndex='roomType' key='roomType' />
        <Table.Column title='TIPE HARI' dataIndex='dayType' key='dayType' />

        <Table.Column
          key='action'
          render={(action) => (
            <>
              <Button onClick={() => setUpdate(action._id)}>UBAH</Button>
              <Button onClick={() => setDelete(action._id)}>HAPUS</Button>
              {/* <Button onClick={() => setUpdateTrigger(true)}>UBAH</Button> */}
              {/* <Button onClick={() => setDeleteTrigger(true)}>HAPUS</Button> */}
              {/* <Modal title='TAMBAHKAN PENGUNJUNG' items={<Form handleChange={handleChange} handleFile={(params) => setKtp(params)} />} open={newTrigger} setOpen={setNewTrigger} confirm={createConsumer} /> */}
              {/* <Modal title='UBAH PENGUNJUNG' items={<Form handleChange={handleChange} />} open={updateTrigger} setOpen={setUpdateTrigger} confirm={() => updateConsumer(action._id)} /> */}
              {/* <Modal title='HAPUS PENGUNJUNG' items='Anda yakin untuk menghapus pengunjung?' open={deleteTrigger} setOpen={setDeleteTrigger} confirm={() => deleteConsumer(action._id)} /> */}
            </>
          )}
        />
      </Table>

      <Modal title='TAMBAHKAN PENGUNJUNG' items={<Form handleChange={handleChange} handleFile={(params) => setKtp(params)} />} open={newTrigger} setOpen={setNewTrigger} confirm={createConsumer} />
      <Modal title='UBAH PENGUNJUNG' items={<Form handleChange={handleChange} />} open={updateTrigger} setOpen={setUpdateTrigger} confirm={updateConsumer} />
      <Modal title='HAPUS PENGUNJUNG' items='Anda yakin untuk menghapus pengunjung?' open={deleteTrigger} setOpen={setDeleteTrigger} confirm={deleteConsumer} />
    </>
  )
}

export default Tables

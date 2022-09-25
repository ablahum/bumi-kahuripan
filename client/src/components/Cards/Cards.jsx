import { Card, Row, Col } from 'antd'
import pattern from '../../assets/pattern.png'
import rupiah from 'rupiah-format'
import styled from 'styled-components'

const CardWrapper = styled(Card)`
  background-image: url(${pattern});
  cursor: default;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`

const Title = styled.h4`
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: 700;
`

const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const datas = [
  {
    title: 'harian',
    visitor: 0,
    profit: 0,
  },
  {
    title: 'mingguan',
    visitor: 0,
    profit: 0,
  },
  {
    title: 'bulanan',
    visitor: 0,
    profit: 0,
  },
  {
    title: 'tahunan',
    visitor: 0,
    profit: 0,
  },
]

const Wrapper = ({ title, visitor, profit }) => {
  return (
    <Col span={6}>
      <CardWrapper hoverable bordered={false}>
        <Title>{title}</Title>
        <DataWrapper>
          <h3 style={{ marginBottom: '.5rem' }}>JUMLAH PENGUNJUNG:</h3>
          <h3 style={{ marginBottom: '.5rem' }}>{visitor}</h3>
        </DataWrapper>
        <DataWrapper>
          <h3 style={{ marginBottom: '.5rem' }}>ESTIMASI LABA:</h3>
          <h3 style={{ marginBottom: '.5rem' }}>{rupiah.convert(profit)}</h3>
        </DataWrapper>
      </CardWrapper>
    </Col>
  )
}

const Cards = () => {
  // const color = ['lightSalmon', 'LightGoldenRodYellow', 'lightGreen', 'lightSkyBlue']

  return (
    <>
      <Row gutter={16}>
        {datas?.map((data, i) => (
          <Wrapper key={i} title={data.title} visitor={data.visitor} profit={data.profit} />
        ))}
      </Row>
    </>
  )
}

export default Cards

import { Card, Row, Col } from 'antd'
import pattern from '../../assets/pattern.png'
import rupiah from 'rupiah-format'

const cardStyle = (color) => {
  const style = {
    background: `url(${pattern}), ${color}`,
    cursor: 'default',
  }
  return style
}

const daily = {
  color: 'lightSalmon',
  title: 'HARIAN',
  visitor: 0,
  profit: 0,
}

const weekly = {
  color: 'LightGoldenRodYellow',
  title: 'MINGGUAN',
  visitor: 0,
  profit: 0,
}

const monthly = {
  color: 'lightGreen',
  title: 'BULANAN',
  visitor: 0,
  profit: 0,
}

const yearly = {
  color: 'lightSkyBlue',
  title: 'TAHUNAN',
  visitor: 0,
  profit: 0,
}

const Base = ({ title, visitor, profit, color }) => {
  return (
    <Col span={6}>
      <Card bordered={false} hoverable style={cardStyle(color)} className='rounded'>
        <h6 className='m-0' style={{ letterSpacing: '.2rem' }}>
          {title}
        </h6>
        <div className='my-3 d-flex justify-content-between align-items-center'>
          <h5 className='m-0'>JUMLAH PENGUNJUNG:</h5>
          <h4 className='m-0 fs-1 fw-bold'>{visitor}</h4>
        </div>
        <div>
          <h6 className='m-0'>ESTIMASI LABA:</h6>
          <h5 className='m-0'>{rupiah.convert(profit)}</h5>
        </div>
      </Card>
    </Col>
  )
}

const Cards = () => {
  return (
    <>
      <Row gutter={16}>
        <Base title={daily.title} visitor={daily.visitor} profit={daily.profit} color={daily.color} />
        <Base title={weekly.title} visitor={weekly.visitor} profit={weekly.profit} color={weekly.color} />
        <Base title={monthly.title} visitor={monthly.visitor} profit={monthly.profit} color={monthly.color} />
        <Base title={yearly.title} visitor={yearly.visitor} profit={yearly.profit} color={yearly.color} />
      </Row>
    </>
  )
}

export default Cards

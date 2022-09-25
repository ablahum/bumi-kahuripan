import { Modal as ModalAntd } from 'antd'

const Modal = ({ title, items, open, setOpen, confirm }) => {
  return (
    <>
      <ModalAntd title={title} centered open={open} onOk={confirm} onCancel={() => setOpen(false)}>
        {items}
      </ModalAntd>
    </>
  )
}

export default Modal

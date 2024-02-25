import React from 'react'
import { Modal, Button, Image } from 'react-bootstrap'

export default function ImageViewModal({
  showModal,
  handleClose,
  imageSrc,
  fullscreen,
}) {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={handleClose}
      fullscreen={fullscreen}
    >
      <Modal.Body>
        <Image src={imageSrc} alt="Selected Image" style={{ width: '100%' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

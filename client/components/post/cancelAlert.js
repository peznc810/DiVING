import Link from 'next/link'
import React from 'react'
import Swal from 'sweetalert2'
import DiButton from './diButton'

export default function CancelAlert({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  href,
}) {
  const handleCancel = (e) => {
    e.preventDefault()

    Swal.fire({
      title: `${title}`,
      text: `${text}`,
      icon: `${icon}`,
      showCancelButton: `${showCancelButton}`,
      confirmButtonColor: `${confirmButtonColor}`,
      cancelButtonColor: `${cancelButtonColor}`,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      customClass: {
        confirmButton: 'confirm-button-class',
        title: 'title-class',
        icon: 'icon-class',
      },
      background: '#d9d9d9',
      iconColor: '#ff9720',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `${href}`
      }
    })
  }

  return (
    <>
      <Link href={'/dashboard/posts'}>
        <DiButton text={'取消'} color={'#dc5151'} onClick={handleCancel} />
      </Link>
      <style jsx>{`
        .confirm-button-class {
          background-color: red !important;
          color: white !important;
          border: none !important;
        }

        .title-class {
          font-size: 15px !important;
        }

        .icon-class {
          font-size: 10px !important;
        }

        .confirm-button-class .swal2-icon svg {
          width: 12px !important;
          height: 12px !important;
        }

        .swal2-actions .swal2-confirm {
          background-color: #f1c40f !important;
          color: white !important;
          border: none !important;
          box-shadow: none !important;
        }

        .swal2-actions .swal2-cancel {
          border-color: #f1c40f !important;
          box-shadow: none !important;
          border: none !important;
        }

        .swal2-confirm:focus,
        .swal2-cancel:focus {
          box-shadow: none !important;
          border: none !important;
        }

        .swal2-actions button:hover {
          border: none !important;
        }
      `}</style>
    </>
  )
}

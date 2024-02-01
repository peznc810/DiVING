import React from 'react'

export default function Sweet() {
  const notify = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return <div>Sweet</div>
}

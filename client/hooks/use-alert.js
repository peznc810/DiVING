import toast from 'react-hot-toast'

export const notify = (msg, status) => {
  if (status === 'error') {
    toast.error(msg, {
      duration: 2000,
      position: 'top-center',
    })
  } else {
    toast.success(msg, {
      duration: 2000,
      position: 'top-center',
    })
  }
}

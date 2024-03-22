import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import toast, { Toaster } from 'react-hot-toast'

const useCollect = (pid) => {
  const [favorites, setFavorites] = useState(false)
  const {
    auth: { id },
  } = useAuth()
  //   console.log('id', id)
  const notify = (text, isSuccess = true) => toast.success(text)
  const notNotify = (text, isSuccess = false) => toast.error(text)

  const fetchIsCollect = async () => {
    try {
      return await fetch(
        `http://localhost:3005/api/product/product-is-collect?pid=${pid}&mid=${id}`,
        {
          method: 'GET',
        }
      )
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          return res.length > 0
        })
    } catch (error) {
      return false
    }
  }
  const handleRemoveFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/product/delete-collect?pid=${pid}&mid=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        // toast
        notify('商品已從收藏移除！')
        fetchIsCollect().then((res) => setFavorites(res))
      }
    } catch (err) {
      // toast
      notify('收藏移除失敗！', false)
    }
  }
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/product/collect',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: id, product_id: Number(pid) }),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      fetchIsCollect().then((res) => setFavorites(res))
      // 吐司通知，表示成功加入收藏
      notify('商品已加入收藏！')
    } catch (error) {
      console.log(error)
      notNotify('請先註冊/登入會員！', false) //加入收藏失败
    }
  }

  useEffect(() => {
    if (!pid) return
    fetchIsCollect().then((res) => setFavorites(res))
  }, [pid, id])

  return {
    handleAddToFavorites,
    handleRemoveFavorites,
    favorites,
  }
}

export default useCollect

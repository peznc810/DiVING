import { useAuth } from '@/hooks/auth'

const fetchIsCollect = async (pid, id) => {
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

const useCollect = (pid) => {
  const {
    auth: { id },
  } = useAuth()
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
        notify('商品已從收藏移除！')
        fetchIsCollect(pid, id).then((res) => setFavorites(res))
      }
    } catch (err) {
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
          body: JSON.stringify({ user_id: id, product_id: product.id }),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      fetchIsCollect(pid, id).then((res) => setFavorites(res))
      // 吐司通知，表示成功加入收藏
      notify('商品已加入收藏！')
    } catch (error) {
      notify('加入收藏失败', false)
    }
  }

  const notify = (text, isSuccess = true) => toast.success(text)

  return {
    handleAddToFavorites,
    handleRemoveFavorites,
  }
}

export default useCollect

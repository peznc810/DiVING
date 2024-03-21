//react next
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//hook
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/cart'
import { useUsingCoupon } from '@/hooks/use-usingCoupon'
//component
import Order from '@/components/cart/order'
import CartStep from '@/components/cart/cart-step'
import OrderForm from '@/components/cart/order-form'
import OrderInfo from '@/components/cart/order-info'
//通知視窗
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const router = useRouter()

  const { auth } = useAuth()
  const { cart } = useCart()
  const { usingCoupon } = useUsingCoupon()

  const [finalPrice, setFinalPrice] = useState()
  const [discount, setDiscount] = useState()
  const [order, setOrder] = useState({})
  const [isDone, setIsDone] = useState(false)

  const { payment, delivery } = router.query

  useEffect(() => {
    if (router.isReady) {
      if (usingCoupon) {
        setFinalPrice(usingCoupon.finalPrice)
        setDiscount(usingCoupon.discount)
      }
    }
  }, [router.isReady])

  const { transactionId, orderId } = router.query

  //檢查交易是否成功

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (!transactionId && orderId) {
          await getOrder(orderId)
        }
        if (!transactionId || !orderId) {
          return
        }
        if (!isDone) {
          await handleConfirmLinePay(transactionId)
        }
      }
    }
    fetchData()
  }, [router.isReady])

  const getOrder = async (orderId) => {
    try {
      const url = `http://localhost:3005/api/order/order?orderId=${orderId}`
      const response = await fetch(url, {
        method: 'GET',
      })

      const result = await response.json()

      console.log(result)

      setIsDone(true)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const handleConfirmLinePay = async (transactionId) => {
    try {
      const url = `http://localhost:3005/api/line-pay/confirm?transactionId=${transactionId}`
      const response = await fetch(url, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()

      if (result.status === 'success') {
        toast.success('付款成功')
      } else if (result.status === 'repeat') {
        toast.success('訂單已成立')
      } else {
        toast.error('付款失敗')
      }

      setIsDone(true)
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error('發生錯誤，無法確認付款')
    }
  }

  return (
    <>
      {isDone ? (
        <Order orderId={orderId} />
      ) : (
        <div className="container">
          <CartStep step={2} />
          <OrderInfo cart={cart} finalPrice={finalPrice} discount={discount} />
          <OrderForm
            payment={payment}
            delivery={delivery}
            order={order}
            setOrder={setOrder}
          />
          <Toaster position="bottom-center" />
        </div>
      )}
    </>
  )
}

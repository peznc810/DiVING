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
  const [order, setOrder] = useState({})
  const [isDone, setIsDone] = useState(false)

  const { payment, delivery } = router.query

  useEffect(() => {
    if (router.isReady) {
      if (usingCoupon) {
        setFinalPrice(usingCoupon.finalPrice)
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

  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      // 先連到node伺服器後，導向至LINE Pay付款頁面
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${order.orderId}`
    }
  }

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
          <OrderInfo cart={cart} finalPrice={finalPrice} />
          <OrderForm
            payment={payment}
            delivery={delivery}
            setOrder={setOrder}
          />
          {payment === '3' && (
            <button onClick={goLinePay} disabled={!order.orderId}>
              Line Pay
            </button>
          )}

          <style jsx>{`
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              margin: 0;
            }

            .span {
              color: #013c64;
              font-weight: bold;
            }

            .discounted {
              color: #dc5151;
            }

            .imperceptible {
              color: #858585;
            }

            .section-name {
              background-color: #f5f5f5;
              padding: 0.5rem;
            }

            table {
              width: 100%;
            }

            tr {
              border-bottom: 1px solid black;
            }

            td,
            th {
              padding: 1rem 0;
              text-align: center;
            }
          `}</style>
          <Toaster position="bottom-center" />
        </div>
      )}
    </>
  )
}

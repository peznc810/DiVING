//react next
import React, { useEffect, useState } from 'react'
//hook
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/cart'
import { useCouponHas } from '@/hooks/use-couponHasData'
import { useUsingCoupon } from '@/hooks/use-usingCoupon'
//component
import CartStep from '@/components/cart/cart-step'
import Cart from '@/components/cart/cart'
import SelectDeliveryPayment from '@/components/cart/select-delivery-payment'
import OrderInfoPrice from '@/components/cart/order-info-price'
import CouponModal from '@/components/cart/coupon-modal'

export default function Home() {
  const { auth } = useAuth()
  const { cart } = useCart()
  const { couponHas } = useCouponHas()
  const { usingCoupon, applyUsingCoupon, removeUsingCoupon } = useUsingCoupon()

  const availableCoupon = couponHas.filter((i) => {
    return i.valid === 1
  })

  const [payment, setPayment] = useState(1)
  const [delivery, setDelivery] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [totalTotalPrice, setTotalTotalPrice] = useState(cart.totalPrice)
  const [showCoupon, setShowCoupon] = useState(false)
  const { totalPrice, deliveryFee } = cart

  useEffect(() => {
    if (usingCoupon && totalPrice < usingCoupon.rule) {
      removeUsingCoupon()
      setDiscount(0)
      setTotalTotalPrice(totalPrice + deliveryFee)
    } else if (usingCoupon) {
      applyUsingCoupon((prevState) => ({
        ...prevState,
        finalPrice: totalPrice + deliveryFee - usingCoupon.discount,
      }))

      setTotalTotalPrice(totalPrice + deliveryFee - usingCoupon.discount)
    } else {
      setTotalTotalPrice(totalPrice + deliveryFee)
    }
  }, [cart])

  useEffect(() => {
    removeUsingCoupon()
  }, [])

  // 收到coupon傳來的資訊
  const selectedCouponData = (data) => {
    console.log(data)
    if (!data) return totalPrice + deliveryFee
    const { coupon_id, coupon_discount, coupon_rule, coupon_name } = data
    let updateTotalPrice = 0
    let updateDiscount = 0
    // 判斷小記金額是否大於coupon_rule
    if (totalPrice > coupon_rule) {
      // Number.isInteger()檢查是否為整數
      if (!Number.isInteger(coupon_discount)) {
        updateTotalPrice = Math.round(
          totalPrice * coupon_discount + deliveryFee
        )
      } else {
        updateTotalPrice = totalPrice - coupon_discount + deliveryFee
      }
      updateDiscount = (updateTotalPrice - totalPrice - deliveryFee) * -1
      applyUsingCoupon({
        id: coupon_id,
        name: coupon_name,
        discount: updateDiscount,
        finalPrice: updateTotalPrice,
        rule: coupon_rule,
      })
    } else {
      removeUsingCoupon()
      updateTotalPrice = totalPrice + deliveryFee
    }
    setTotalTotalPrice(updateTotalPrice)
    setDiscount(updateDiscount)
  }

  return (
    <div className="container my-5">
      <CartStep step={1} />
      <Cart />
      <div className="row mt-5 container justify-content-between order-detail">
        <SelectDeliveryPayment
          payment={payment}
          delivery={delivery}
          setPayment={setPayment}
          setDelivery={setDelivery}
        />
        <OrderInfoPrice
          auth={auth}
          cart={cart}
          payment={payment}
          delivery={delivery}
          discount={discount}
          totalTotalPrice={totalTotalPrice}
          setShowCoupon={setShowCoupon}
        />
      </div>
      <CouponModal
        showCoupon={showCoupon}
        couponHas={availableCoupon}
        setShowCoupon={setShowCoupon}
        dataForParent={selectedCouponData}
      />
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

        .order-detail {
          margin-inline: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}

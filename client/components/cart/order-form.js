import React, { useState, useEffect } from 'react'

import Delivery from './form/delivery'
import CreditCard from './form/credit-card'
import Store711 from './form/store-7-11'
import { useAuth } from '@/hooks/auth'

export default function OrderForm({
  handleSubLinePay,
  handleSub,
  userInputs,
  setUserInputs,
  payment,
}) {
  const [cUser, setCUser] = useState()
  const { auth } = useAuth()

  const getUserProfile = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        setCUser(result.userData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserProfile(auth.id)
    }
  }, [auth])

  const delivery = 1

  //處理input更新
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="container">
        <form onSubmit={payment === 2 ? handleSubLinePay : handleSub}>
          {delivery === 1 ? (
            <>
              <Delivery
                handleInputChange={handleInputChange}
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                cUser={cUser}
              />
            </>
          ) : (
            <>
              <Store711
                handleInputChange={handleInputChange}
                userInputs={userInputs}
                setUserInputs={setUserInputs}
              />
            </>
          )}

          <div className="container">
            <div className="w-100 section-name text-center">
              <h5 className="span">訂單備註</h5>
            </div>
            <textarea
              className="form-control spacing"
              rows="5"
              maxLength={50}
              name="order_note"
              defaultValue={userInputs.order_note}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {payment === 3 ? (
            <>
              <CreditCard
                handleInputChange={handleInputChange}
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                cUser={cUser}
              />
            </>
          ) : (
            <></>
          )}
          <div className="text-end my-3">
            <button type="submit" className="btn next-step-btn text-white px-5">
              <h5 className="fw-bold py-1 px-3">提交訂單</h5>
            </button>
          </div>
        </form>
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

          .next-step-btn {
            background-color: #ff9720;
          }

          .spacing {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .section-name {
            background-color: #f5f5f5;
            padding: 0.5rem;
          }
        `}</style>
        {/* <AutoTab className="autotab-4" maxLength={4} /> */}
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { da } from 'date-fns/locale'

export default function Home() {
  const router = useRouter()

  const [userInputs, setUserInputs] = useState({
    user_name: '',
    user_phone: '',
    user_city: '',
    user_section: '',
    user_road: '',
    cCard_name: '',
    cCard_address: '',
    order_note: '',
  })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSub = (e) => {
    e.preventDefault()
    const user_name = document.querySelector('.user_name').value
    const user_phone = document.querySelector('.user_phone').value

    const data = { user_name, user_phone }
    let url = 'http://localhost:3005/api/line-pay'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
    // router.push('./step3')
  }

  const test = () => {
    let url = 'http://localhost:3005/api/line-pay'
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.error('An error occurred:', err)
      })
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSub}>
        <div className="container">
          <div className="w-100 section-name text-center">
            <h5 className="span">送貨資料</h5>
          </div>
          <div className="container">
            <div className="row justify-content-between spacing">
              <div className="col-6">
                <p className="fw-bold">收件人名稱</p>
                <input
                  type="text"
                  className="w-100 form-control user_name"
                  name="user_name"
                  defaultValue={userInputs.user_name}
                />
              </div>
              <div className="col-6">
                <p className="fw-bold">收件人電話</p>
                <input
                  type="text"
                  className="w-100 form-control user_phone"
                  name="user_phone"
                  defaultValue={userInputs.user_phone}
                />
              </div>
            </div>
          </div>
        </div>
        <button>asd</button>
      </form>
      <button onClick={test}>qqqqq</button>
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

        .discounted {
          color: #dc5151;
        }

        .imperceptible {
          color: #858585;
        }

        .section-name {
          background-color: #f5f5f5;
          padding-left: 0.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        table {
          width: 100%;
        }

        tr {
          border-bottom: 1px solid black;
        }

        td,
        th {
          padding-top: 1rem;
          padding-bottom: 1rem;
          text-align: center;
        }

        @media (max-width: 576px) {
          .credit-card-section {
          }
        }
      `}</style>
    </div>
  )
}

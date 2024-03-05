import React, { useState } from 'react'
import Link from 'next/link'

// login with firebase
import { auth, provider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'

// login with OAuth 2.0
// import { GoogleLogin } from '@react-oauth/google'
// import { jwtDecode } from 'jwt-decode'

export default function Login() {
  const [decode, setDecode] = useState({})

  // const login = async () => {
  //   const result = await signInWithPopup(auth, provider)
  //   console.log(result)
  // }
  return (
    <>
      <div className="container my-5 pt-5">
        <h2 className="text-center">Login page</h2>
        <div className="d-flex justify-content-center mb-2">
          <Link href="/test/google-login" className="me-3">
            Login
          </Link>
          <Link href="/test/user" className="me-3">
            User
          </Link>
          <Link href="/test/Home" className="me-3">
            Home
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <button>登入</button>
          {/* 自定按鈕樣式 START */}
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              setDecode(jwtDecode(credentialResponse?.credential))
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          /> */}
          {/* 自定按鈕樣式 END */}
        </div>
        <h3>My Name</h3>
        {/* <p>{decode.name}</p> */}
        <h3>My Email</h3>
        {/* <p>{decode.email}</p> */}
        <h3>My Picture</h3>
        {/* <img src={decode.picture} alt="" /> */}
      </div>
    </>
  )
}

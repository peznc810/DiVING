import { createContext, useContext, useState } from 'react'
import Router from 'next/router'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  // 使用者的狀態
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  })
  // 表單錯誤訊息的狀態
  const [error, setError] = useState({
    // Require Message
    emailReq: '',
    passwordReq: '',
    // Fill Error Message
    fillErr: '',
  })

  // 解譯token的方法
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  // 登入
  const login = (e) => {
    e.preventDefault()
    // 建立自定義表單，並把form的資料格式放入
    let formData = new FormData(e.target)
    // console.log(e.target)

    // // FormData本身不具可迭代性
    // // 因此需要透過entries()這個迭代器協助取出資料檢查
    // // for (let [key, value] of formData.entries()) {
    // //   console.log(`${key}: ${value}`)
    // // }
    let hasError = false
    let newError = {
      // Require Message
      emailReq: '',
      passwordReq: '',
      // Fill Error Message
      fillErr: '',
    }
    // // 把表單資料傳給後台
    let url = 'http://localhost:3005/api/users/login'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        if (result.status === 'error') {
          newError.fillErr = result.msg
          hasError = true
        } else {
          // 登入成功要做的事
          let token = result.token
          // console.log(token)
          // 解譯token
          const userData = parseJwt(token)
          // 把會員的資料放到狀態中，之後可以共享到其他頁面
          setUser({ ...userData, valid: true })
          // 把token存入localStorage
          // 後續要重新抓登入狀態時會需要
          localStorage.setItem('token', token)

          // 檢查解譯出來的data
          // for (let [key, value] of Object.entries(user)) {
          //   console.log(`${key}: ${value}`)
          // }
          hasError = false
          // **成功要導向首頁還是會員頁？
          Router.push('/')
        }

        if (hasError) {
          setError(newError)
          return
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 登出
  const logout = () => {
    let url = 'http://localhost:3005/api/users/logout'
    let token = localStorage.getItem('token')
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(() => {
        // 把狀態中的user資料清除
        setUser({
          email: '',
          password: '',
          name: '',
        })
        localStorage.removeItem('token')
        // console.log(result) /* 登入成功 */
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 註冊
  const signUp = (e) => {
    e.preventDefault()
    // 建立自定義表單，並把form的資料格式放入
    let formData = new FormData(e.target)
    // console.log(e.target)
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }

    let hasError = false
    let newError = {
      // Require Message
      emailReq: '',
      passwordReq: '',
      // Fill Error Message
      fillErr: '',
    }
    // 把表單資料傳給後台
    let url = 'http://localhost:3005/api/users/register'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        if (result.status === 'error') {
          newError.fillErr = result.msg
          hasError = true
        } else {
          hasError = false
          Router.push('/users/login')
        }

        if (hasError) {
          setError(newError)
          return
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // **進入網頁需要執行登入狀態確認，好像可以用Effect? 要確認幾次？
  // 失敗中..sever用useEffect會回傳好幾次資料
  const initUser = () => {
    let token = localStorage.getItem('token')
    let url = 'http://localhost:3005/api/users/status'
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // 刷新頁面後，後台會給予新的token
        token = result.token
        // console.log(token)
        // 將新的token解譯出來，取出資料放入狀態
        const userData = parseJwt(token)
        setUser(userData)
        // 要設定新的token進localStorage
        localStorage.setItem('token', token)
      })
      .catch((err) => console.log(err))
    // 要把userData的資料傳給其他頁面使用，這段最後得改寫到父母元件
  }

  return (
    <AuthContext.Provider
      value={{ user, error, parseJwt, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

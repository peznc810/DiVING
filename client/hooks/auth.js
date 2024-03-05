import { createContext, useContext, useState } from 'react'
import Router from 'next/router'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  // 使用者的全域狀態
  const [user, setUser] = useState({
    userEmail: '',
    userName: '',
    tel: '',
    isUser: false,
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
        if (result.status !== 'error') {
          // 登入成功要做的事
          let token = result.token
          // console.log(token)
          // 解譯token
          const userData = parseJwt(token)
          // 把會員的資料放到狀態中，之後可以共享到其他頁面
          setUser({ ...userData, isUser: true })
          // 把token存入localStorage
          // 後續要重新抓登入狀態時會需要
          localStorage.setItem('token', token)

          // 檢查解譯出來的data
          // for (let [key, value] of Object.entries(user)) {
          //   console.log(`${key}: ${value}`)
          // }
          Router.push('/')
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
      .then((result) => {
        // 把狀態中的user資料清除
        setUser({
          userEmail: '',
          userName: '',
          tel: '',
          isUser: false,
        })
        console.log(result)
        localStorage.removeItem('token')
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
        if (result.status !== 'error') {
          Router.push('/users/login')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // **進入網頁皆需要執行登入狀態確認
  const initUser = () => {
    // 如果未登出，並重新進入(刷新)頁面，需要拿存留的token跟伺服器請求資料
    let token = localStorage.getItem('token')
    // 伺服器要確認當前的token是否過期
    if (token) {
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
          if (result.status === 'error') {
            // 之後可能用alert之類的提示訊息處理
            console.log(result.msg)
            return
          }
          // 刷新頁面後，後台會給予新的token
          token = result.token
          // console.log(token)
          // 將新的token解譯出來，取出資料放入狀態
          const userData = parseJwt(token)
          setUser({ ...userData, isUser: true })
          // 要設定新的token進localStorage
          localStorage.setItem('token', token)
        })
        .catch((err) => console.log(err))
    } else {
      // 可能之後可以變成給新會員的相關優惠通知
      return
    }
  }

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        parseJwt,
        login,
        logout,
        signUp,
        initUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

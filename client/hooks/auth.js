import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { notify } from '@/hooks/use-alert'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const router = useRouter()
  const initAuth = {
    id: '',
    userEmail: '',
    userName: '',
    avatar: '',
    isAuth: false,
    isGoogle: false,
  }
  // 使用者的全域狀態
  const [auth, setAuth] = useState(initAuth)

  // 表單使用的錯誤訊息
  const [errorMsg, setMsg] = useState('')

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
    // // 把表單格式的資料傳給後台
    let url = 'http://localhost:3005/api/users/login'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        const { status, msg } = result
        if (result.status !== 'error') {
          // 登入成功要做的事
          const token = result.token
          // 解譯token
          const user = parseJwt(token)
          const id = user.id.toString()
          const userData = { ...user, id: id }
          // 把會員的資料放到狀態中，之後可以共享到其他頁面
          setAuth({ ...userData, isAuth: true })
          // 把token存入localStorage，後續要重新抓登入狀態時會需要
          localStorage.setItem('token', token)

          router.push('/')
          notify(msg, status)
        } else {
          setMsg(result.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Google登入
  const loginGoogle = (providerData) => {
    const userData = JSON.stringify(providerData)
    let url = 'http://localhost:3005/api/users/google-login'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: userData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        let { status, msg } = result
        if (result.status === 'success') {
          const token = result.token
          // 登入成功要做的事
          // 解譯token
          const userData = parseJwt(token)
          // 把會員的資料放到狀態中，之後可以共享到其他頁面
          setAuth({ ...userData, isAuth: true, isGoogle: true })
          // 把token存入localStorage，後續要重新抓登入狀態時會需要
          localStorage.setItem('token', token)
          router.push('/')
          notify(msg, status)
        } else {
          // server res be like:
          // res.status(401).json({
          //   status: "error",
          //   msg: "查無使用者，請先註冊",
          // })
          setMsg(msg)
          notify(msg, status)
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
        const { status, msg } = result
        // 把狀態中的user資料清除
        setAuth(initAuth)
        localStorage.removeItem('token')
        notify(msg, status)
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
    // 把表單資料傳給後台
    let url = 'http://localhost:3005/api/users/register'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        const { status, msg } = result
        if (result.status !== 'error') {
          notify(msg, status)
          router.push('/users/login')
        } else {
          notify(msg, status)
          setMsg(msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Google註冊
  const signUpGoogle = (providerData) => {
    const userData = JSON.stringify(providerData)
    // 把表單資料傳給後台
    let url = 'http://localhost:3005/api/users/google-register'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        const { status, msg } = result
        if (result.status !== 'error') {
          notify(msg, status)
          router.push('/users/login')
        } else {
          setMsg(msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 登入頁路由
  const loginRoute = '/users'
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
  const protectedRoutes = '/dashboard'

  // **進入網頁皆需要執行登入狀態確認
  const checkAuth = () => {
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
          if (result.status === 'success') {
            // 刷新頁面後，後台會給予新的token
            token = result.token
            // 將新的token解譯出來，取出資料放入狀態
            const userData = parseJwt(token)
            setAuth({ ...userData, isAuth: true })
            // 要設定新的token進localStorage
            localStorage.setItem('token', token)
            // 如果在登入狀態下進入login頁面，會轉跳至會員中心
            if (router.pathname.startsWith(loginRoute)) {
              router.push(protectedRoutes)
            }
          } else {
            // token過期，跳轉至登入頁面
            if (router.pathname.startsWith(protectedRoutes)) {
              router.push(loginRoute)
            }
            setAuth(initAuth)
            localStorage.removeItem('token')
            // 之後可能改用alert之類的提示訊息處理
            console.warn(result.msg)
          }
        })
        .catch((err) => console.log(err))
    } else {
      // 沒有token的話(沒有登入)，則導向登入頁面
      // 這邊因為輸入/dashboard會導向/dashboard/profile，因此在dashboard的入口有再判斷一次
      // **這邊會閃一下內頁，有沒有辦法解決？ loading?
      if (router.pathname.startsWith(protectedRoutes)) {
        router.push(loginRoute)
      }
      return
    }
  }

  // 初次渲染後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()
    }
  }, [router.isReady])

  // 會員頭像狀態
  const unKnow = '/images/users/unknow.jpg'
  const [avatar, setAvatar] = useState(unKnow)
  useEffect(() => {
    if (auth.avatar !== '') {
      setAvatar(`http://localhost:3005/avatar/${auth.avatar}`)
    }
    if (auth.isGoogle === true) {
      setAvatar(auth.avatar)
    }
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        setMsg,
        errorMsg,
        parseJwt,
        login,
        loginGoogle,
        logout,
        signUp,
        signUpGoogle,
        checkAuth,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

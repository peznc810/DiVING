// "firebase"
//在config中已初始化
import { auth, provider } from '@/config/firebase'
import {
  signInWithPopup,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'

// Firebase
// 第一種登入方式
// 雖然一樣拿的到資料，但Cross會報錯
const loginWithGoogle = (callback) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      callback(result.user.providerData[0])
    })
    .catch((err) => console.log(err))
}

// 第二種登入方式
// Redirect不會有callback
const loginGoogleRedirect = () => {
  signInWithRedirect(auth, provider)
}

// 改用 initGoogle 在頁面初次渲染後監聽google登入狀態
const initGoogle = (callback) => {
  // 取得google登入者的資料
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        // 取得登入者的憑證資料，以便取得 accessToken
        // 兩種寫法都可以
        // 1.
        // const token = result.user.accessToken
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // 2.
        // const token = credential.accessToken
        const user = result.user
        // console.log(user)
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // Listening for auth state changes.
  // 如果有登入google要執行的事情
  // 將收到的google資料透過callback function送出去
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // callback the user data, be like:
      // displayName: "Ruby"
      // email: "ruby.test.0404@gmail.com"
      // phoneNumber: "0987654321"
      // photoURL: "https://lh3.googleusercontent.com/a/ACg8ocIBPbfe5IvbNyCT1cplBBGX2ymc4hJGmxNlDz6niyQZ=s96-c"
      // providerId: "google.com"
      // uid: "118334986243790178237"
      callback(user.providerData[0])
    }
  })
}

const logoutFirebase = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
}

export default function useFirebase() {
  return { loginWithGoogle, loginGoogleRedirect, initGoogle, logoutFirebase }
}

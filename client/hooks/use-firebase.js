// "firebase"
//在config中已初始化
import { auth, provider } from '@/config/firebase'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'

import { useEffect } from 'react'

// Firebase
const initGoogle = () => {
  getRedirectResult(auth)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

const loginWithGoogle = async (callback) => {
  signInWithPopup(auth, provider)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

// 無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
const loginGoogleRedirect = (callback) => {
  signInWithRedirect(auth, provider)
}

export default function useFirebase() {
  return { loginWithGoogle, loginGoogleRedirect, initGoogle }
}

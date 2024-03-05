// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDweyQwyoZ2jaboQO2kKxOKYF8eq1W-2-Y',
  authDomain: 'react-auth-8639c.firebaseapp.com',
  projectId: 'react-auth-8639c',
  storageBucket: 'react-auth-8639c.appspot.com',
  messagingSenderId: '499319725990',
  appId: '1:499319725990:web:8d97b85bae33e68a1cb967',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

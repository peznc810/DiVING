import { useState } from 'react'

// 表單使用的錯誤訊息
export default function useFormCheck() {
  // 初始化
  const initPWD = {
    origin: '',
    newPWD: '',
    rePWD: '',
  }
  const initMsg = {
    originErr: '',
    newPWDErr: '',
    rePWDErr: '',
  }

  const [password, setPWD] = useState(initPWD)
  const [errorMsg, setMsg] = useState(initMsg)

  // Rule
  const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}/

  // Error module
  const errText = {
    empty: '*必填欄位',
    emailSyntax: '輸入格式錯誤',
    passwordSyntax: '請輸入8-12位數(含大小寫英文字母)',
    different: '密碼不符',
    reuse: '重複使用相同密碼',
  }

  const handleChangePWD = (e) => {
    setPWD({ ...password, [e.target.name]: e.target.value })
  }

  const handleCheck = () => {
    switch (true) {
      case password.origin.trim() === '':
        setMsg({ ...errorMsg, originErr: errText.empty })
        break
      case password.newPWD.trim() === '':
        setMsg({ ...errorMsg, newPWDErr: errText.empty })
        break
      case !passwordRegex.test(password.newPWD):
        setMsg({ ...errorMsg, newPWDErr: errText.passwordSyntax })
        break
      case password.origin === password.newPWD:
        setMsg({ ...errorMsg, newPWDErr: errText.reuse })
        break
      case password.rePWD.trim() === '':
        setMsg({ ...errorMsg, rePWDErr: errText.empty })
        break
      case password.newPWD !== password.rePWD:
        setMsg({ ...errorMsg, rePWDErr: errText.different })
        break
      default:
        return true
    }
  }
  return { handleCheck, handleChangePWD, errorMsg, setMsg, initMsg, password }
}

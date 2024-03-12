// const [input, setInput] = useState({
//   emailVal: '',
//   passwordVal: '',
// })

// const [formCheck, setFormCheck] = useState({
//   email: true,
//   password: true,
// })

// const handleSubmit = (e) => {
//   e.preventDefault()
//   const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
//   const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]){8,12}/
//   switch (true) {
//     case input.emailVal.trim() === '':
//       setError('電子郵件不得為空')
//       setFormCheck({ ...formCheck, email: false })
//       break
//     case !emailRegex.test(input.emailVal):
//       setError('電子郵件格式錯誤')
//       setFormCheck({ ...formCheck, email: false })
//       break
//     case input.passwordVal.trim() === '':
//       setError('密碼不得為空')
//       setFormCheck({ ...formCheck, password: false })
//       break
//     // case !passwordRegex.test(input.passwordVal):
//     //   setError('帳號或密碼錯誤')
//     //   break
//     default:
//       setFormCheck({ email: true, password: true, allCheck: true })
//   }
// }

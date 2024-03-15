const btnSend = document.querySelector('.btn-send')
btnSend.addEventListener('click', (e) => {
  e.preventDefault()
  let form = document.querySelector('form')
  // 不一定要有form元素 可以自己組合表單去送出資料
  let formData = new FormData(form) //模擬表單內容 把form元素放進去自動產生
  console.log(formData) //是物件 要轉

  //設計用來取用物件裡面所有的東西
  // for(let p of formData){
  //   console.log(p); //得到陣列
  //   /**/
  // }
  for (let [key, value] of formData.entries()) {
    //.entries()轉成可以迭代的 亦迭器??
    /*entries() 方法傳回一個陣列的迭代對象，該物件包含數組的鍵值對(key/value)。

迭代物件中數組的索引值作為key， 數組元素作為value。 */
    console.log(key, value)
    console.log(`${key}: ${value} `)
  }
  let url = 'http://localhost:3000'

  /* fecth完的資料會跑到.then res完才會到第二個 在處理會變result catch通常都是用json接 遇到別的資料 自己再去查 可以裝套件輔助fetch API
   */
  fetch(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
})

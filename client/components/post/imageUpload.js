import Image from 'next/image'
import React, { useState, useEffect } from 'react'

export default function ImageUpload() {
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }
    handleSubmission()
    // createObjectURL產生一個臨時性的URL 預覽用
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const changeHandler = (e) => {
    //有檔案上傳時
    const file = e.target.files[0]
    console.log(file)
    // 表單上傳元素沒辦法完全由react可控
    if (file) {
      setIsFilePicked(true)
      setSelectedFile(file)
      setImgServerUrl('')
      // handleSubmission()
    } else {
      setIsFilePicked(false)
      setSelectedFile(null)
      setImgServerUrl('')
    }
  }

  const handleSubmission = () => {
    const formData = new FormData()

    // 對照server上的檔案名稱 req.files.avatar
    formData.append('images', selectedFile)

    fetch('http://localhost:3005/api/post/upload-images', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Server Response:', response)
        return response.json()
      })
      .then((result) => {
        console.log('Success:', result)
        setImgServerUrl('http://localhost:3005/upload/' + result.data.name)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={changeHandler}
      />
      {selectedFile && (
        <div style={{ width: '100%', height: '300px', position: 'relative' }}>
          預覽圖片:{' '}
          <Image
            src={preview}
            alt="images"
            fill={true}
            style={{ objectFit: 'contain' }}
            priority={false}
          ></Image>
        </div>
      )}
      {isFilePicked ? (
        <>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </>
      ) : (
        <p>選擇檔案以預覽</p>
      )}
      {/* <div>
        <button onClick={handleSubmission}>送出</button>
      </div> */}
      <div>
        伺服器圖片網址:
        <a href={imgServerUrl} target="_blank" rel="noreferrer">
          {imgServerUrl}
        </a>
      </div>
    </>
  )
}

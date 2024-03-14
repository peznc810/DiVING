import React, { use, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { menuItems } from '@/config/dashboard-menu'

// user Data
import { useAuth } from '@/hooks/auth'
// React icon
import { TbLogout2 } from 'react-icons/tb'
// React Bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function Menu() {
  const router = useRouter()
  const path = router.pathname
  const { logout, avatar, checkAuth } = useAuth()

  // const unKnow = '/images/users/unknow.jpg'

  // file refs
  const [file, setFiles] = useState(null)
  // const [avatar, setAvatar] = useState(unKnow)
  const fileInputRef = useRef(null)

  // 誰改變了以後要再渲染一次？
  // useEffect(() => {
  //   if (auth.avatar !== '') {
  //     setAvatar(`http://localhost:3005/avatar/${auth.avatar}`)
  //   }
  // }, [auth])

  // 替代input file
  const handleFIleRef = () => {
    fileInputRef.current.click()
  }

  // 圖片預覽
  const previewImg = file ? URL.createObjectURL(file) : avatar

  // handle Modal
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setFiles(null)
  }
  const handleShow = () => setShow(true)

  const handleFile = (e) => {
    setFiles(e.target.files[0])
  }

  // upload API
  const handleUploadAvatar = async () => {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:3005/api/avatar/upload'
    const formData = new FormData()

    formData.append('avatar', fileInputRef.current.files[0])

    // for (const key of formData.entries()) {
    //   console.log(key)
    // }
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // 成功更新頭像後，需要再重新抓取會員資料
        checkAuth()
        handleClose()
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div
        className={`col-sm-4 rounded-start text-white px-0 ${styles['menu-container']}`}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>編輯照片</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`m-auto ${styles.avatar}`}>
              <Image src={previewImg} alt="newAvatar" fill />
            </div>
            <input
              type="file"
              name="avatar"
              id="avatar"
              ref={fileInputRef}
              className=""
              accept="image/*"
              onChange={handleFile}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="text-white"
              variant="secondary"
              onClick={handleClose}
            >
              取消
            </Button>
            <Button variant="primary" onClick={handleUploadAvatar}>
              儲存
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container mt-4 px-0">
          {/* 大頭照 */}
          <div className="mb-4">
            <div className={`m-auto ${styles.avatar}`}>
              <Image
                src={
                  avatar
                  // auth.avatar === ''
                  //   ? unKnow
                  //   : `http://localhost:3005/avatar/${avatar}`
                }
                alt="avatar"
                fill
                priority
              />
              <div
                className={`d-flex align-items-end w-100 h-100 position-absolute top-0 start-0 ${styles.content}`}
                onClick={handleShow}
              >
                <p className="small text-center text-white w-100 m-0 py-1">
                  編輯
                </p>
              </div>
            </div>
          </div>
          {/* 列表 */}
          <ul className="list-unstyled my-3 px-0">
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={`text-center text-sm-start ps-sm-4 ${
                      path.includes(item.pathname) ? 'bg-secondary' : ''
                    }`}
                    href={`/dashboard/${item.pathname}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                className="text-center text-sm-start ps-sm-4"
                href="/"
                onClick={logout}
              >
                <TbLogout2 />
                登出
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

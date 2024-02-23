// 動態路由的意思 網址後面那一段會轉化為pid這個變數
// 怎麼看到這一頁? 在這個資料夾裡面 不是list頁都算是詳細頁 (酷!)
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/loader/loader_ripple.module.css'
import postData from '@/data/post/post.json'

import { Container, Card, Col, Row, Button } from 'react-bootstrap'

export default function Detail() {
  const router = useRouter()

  const [post, setPost] = useState({
    // 物件的話 初始值不一樣 如果怕0被渲染 再寫個判斷去擋?
    id: '',
    author: '',
    published: '',
    image: '',
    title: '',
    content: '',
    tags: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const getPost = async (pid) => {
    try {
      //   網址改成pid 用傳入的
      //   const res = await fetch(
      //     `https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/${pid}`
      //   )

      //   const data = await res.json()
      const data = postData.find((post) => post.id === `${pid}`)
      console.log(data)

      if (data.title) {
        setPost(data)

        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // 出現值我們再跟伺服器要資料
    console.log(router.query)

    if (router.isReady) {
      // 如果isReady是true 確保能得到 query的值
      const { pid } = router.query
      // 不這樣的話 會有不是pid的情況 會有要不到資料的情況 會變有多餘的請求
      console.log(pid)

      getPost(pid)
    }
  }, [router.isReady]) //Eddy說just警告

  const loader = (
    <>
      <div className={styles['lds-ripple']}>
        <div></div>
        <div></div>
        <div></div>
      </div>{' '}
    </>
  )

  const display = (
    <>
      <hr />
      <Container>
        <Row>
          <Col>
            <h4>相關文章</h4>
          </Col>
          <Col xs={9} className="bg-light">
            <p>{post.published}</p>
            <h3>{post.title}</h3>
            <p>作者:{post.author}</p>
            <div className="p-2">
              {' '}
              <Button variant="primary">{post.tags}</Button>{' '}
            </div>
            <Card.Img variant="top" src={`/images/post/${post.image}`} />
            <p>內文:{post.content}</p>
          </Col>
        </Row>
      </Container>
    </>
  )
  return (
    <>
      <Link href="/post/list">回列表頁</Link>
      {isLoading ? loader : display}
      <hr />
    </>
  )
}

import { Carousel, Image } from 'react-bootstrap'
import postData from '@/data/post/post.json'
import styles from '@/pages/post/post-list.module.css'

export default function Caor() {
  return (
    <Carousel className={styles['carousel']}>
      {postData.map((v) => (
        <Carousel.Item key={v.id} className={styles['carousel-item']}>
          <Image src={`/images/post/${v.image}`} rounded alt="" />
          <Carousel.Caption>
            <h3>{v.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

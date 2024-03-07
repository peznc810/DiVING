import { Carousel, Image } from 'react-bootstrap'
import postData from '@/data/post/post.json'
import styles from './post-list.module.scss'
import Link from 'next/link'

export default function Caro() {
  return (
    <Carousel
      interval={5000}
      fade={true}
      slide={true}
      className={styles['carousel']}
    >
      {postData.map((v) => (
        <Carousel.Item key={v.id} className={styles['carousel-item']}>
          <Link href={`/post/${v.id}`} style={{ textDecoration: 'none' }}>
            <Image
              rounded
              variant="top"
              src={`/images/post/${v.image}`}
              alt={v.image}
            />
          </Link>

          <Carousel.Caption>
            <h3>{v.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

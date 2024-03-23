import { Carousel, Image } from 'react-bootstrap'
import styles from './post-list.module.scss'
import Link from 'next/link'

export default function Caro(postList) {
  return (
    <Carousel
      interval={5000}
      fade={true}
      slide={true}
      className={styles['carousel']}
    >
      {postList.slice(0, 3).map((v) => (
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

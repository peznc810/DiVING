import { useEffect, useState } from 'react'

import styles from './star.module.css'

export default function Star({
  startRating = 0,
  onRatingChange = () => {},
  color = 'gold',
  rating,
  setRating,
}) {
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    setRating(startRating)
  }, [startRating])

  return (
    <>
      <div>
        {Array(5)
          .fill(1)
          .map((v, i) => {
            //每個星星的分數
            const score = i + 1

            return (
              <button
                key={i}
                className={styles['star-btn']}
                onClick={() => {
                  setRating(score)
                  // 回傳到父母元件用的
                  onRatingChange(score)
                }}
                onMouseEnter={() => {
                  setHoverRating(score)
                }}
                onMouseLeave={() => {
                  setHoverRating(0)
                }}
              >
                <span
                  // 分數(score)小於等於目前的評分(rating)的星星圖都要亮起
                  className={
                    score <= rating || score <= hoverRating
                      ? styles['on']
                      : styles['off']
                  }
                  style={{ '--on-color': color }}
                >
                  &#9733;
                </span>
              </button>
            )
          })}
      </div>
    </>
  )
}

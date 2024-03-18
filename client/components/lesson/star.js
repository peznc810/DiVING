import { useState } from 'react'
import { GiRoundStar } from 'react-icons/gi'
import style from '@/styles/lessonStyle/star.module.css'

export default function Star() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  return (
    <>
      <div>
        {Array(5)
          .fill(1)
          .map((v, i) => {
            {
              /* score把每個星星評分 */
            }
            const score = i + 1
            return (
              <button
                className={style['star-btn']}
                key={i}
                onMouseEnter={() => {
                  setHoverRating(score)
                }}
                onMouseLeave={() => {
                  setHoverRating(0)
                }}
                onClick={() => {
                  setRating(score)
                }}
              >
                <GiRoundStar
                  className={
                    score <= rating || score <= hoverRating
                      ? style['on']
                      : style['off']
                  }
                />
              </button>
            )
          })}
      </div>

      <p>你以評分:{rating}</p>
    </>
  )
}

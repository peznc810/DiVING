import { useEffect, useState } from 'react'
// 導入.module.css檔案
// 下面程式中可用`styles.on`或`styles["on"]`套入css類別
import styles from './star.module.css'

export default function Star({
  startRating = 0,
  onRatingChange = () => {},
  color = 'gold',
}) {
  // 記錄評分(0~5)
  // anti-pattern(反樣式): 以props(屬性)作為state(狀態)的初始化值，或稱為derived(衍生的) state
  // https://zh-hant.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://vhudyma-blog.eu/react-antipatterns-props-in-initial-state/
  // 一般而言，props作為state初始值應避免，除非只需要在內部狀態初始化而已，
  // 而且之後props不會再被更動，或元件不需要再反應其它更動時
  const [rating, setRating] = useState(0)
  // 記錄hover時的評分(0~5)
  const [hoverRating, setHoverRating] = useState(0)

  // 解決上面反樣式(其一解法)
  // 如果要保持和startRating連動，需要用這個useEffect監聽startRating變動，再設定到Rating中
  useEffect(() => {
    setRating(startRating)
  }, [startRating])
  // ^^^^^^^^^^^^^類似監聽startRating變動(change)的意思

  return (
    <>
      <div>
        {/* `Array(5).fill(1)`可以快速產生5個成員，值都是1的陣列 */}
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
                  // 設定css變數，在star.module.css中可以套用
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

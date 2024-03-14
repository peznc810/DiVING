import { useRef, useEffect } from 'react'
import styles from './index.module.scss'

export default function HomeHeader() {
  const videoRef = useRef(null)

  useEffect(() => {
    // 在组件加载时播放视频
    videoRef.current.play()
  }, [])

  return (
    <>
      <header className={` ${styles.homeHeader}`}>
        <div className={`${styles.videoBg}`}>
          <video
            ref={videoRef}
            src="/video/home/header.mp4"
            autoPlay
            muted
            loop
          ></video>
          <div className={`${styles.videoOverlay}`}></div>
        </div>

        <div className={`${styles.homeContainer}`}>
          <h2>
            LET'S GO <br /> DiVING
          </h2>
          <ul
            className={`d-flex justify-content-center align-items-center p-0`}
          >
            <li>
              <h4 className="">嚴選品牌</h4>
            </li>
            <li>
              <h4 className="">專業教練</h4>
            </li>
            <li>
              <h4 className="">海洋環保</h4>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

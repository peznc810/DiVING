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
        <div className={`${styles.homeContainer}`}>
          <h2>{`Let's Go DiVING`}</h2>
          <h4 className="">精選品牌｜專業教練｜探索海洋世界</h4>
        </div>
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
      </header>
    </>
  )
}

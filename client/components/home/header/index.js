import { useRef, useEffect } from 'react'
import styles from './index.module.scss'
import { motion } from 'framer-motion'

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
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'tween',
              delay: 0.5,
              duration: 1,
              ease: 'easeIn',
            }}
            viewport={{ once: true }}
          >
            LET'S GO <br /> DiVING
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'tween',
              delay: 0.5,
              duration: 1,
              ease: 'easeIn',
            }}
            viewport={{ once: true }}
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
          </motion.ul>
        </div>
      </header>
    </>
  )
}

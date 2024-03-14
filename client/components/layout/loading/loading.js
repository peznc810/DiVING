import React from 'react'
import styles from './loading.module.scss'
import SyncLoader from 'react-spinners/SyncLoader'

export default function Loading() {
  return (
    <>
      <div
        className={`${styles.loading} d-flex flex-column justify-content-center align-items-center text-center`}
      >
        <div className={`${styles.loadingInner}`}>
          <SyncLoader
            color={'#aeedff'}
            loading={true}
            // cssOverride={override}
            size={10}
            margin={10}
            speedMultiplier={0.8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className={`${styles.text} text-light`}>loading...</p>
        </div>
      </div>
    </>
  )
}

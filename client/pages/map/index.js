import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap'
import aboutData from '@/data/map/about'
import mapData from '@/data/map/map'
import DiButton from '@/components/post/dibutton'
import { FaWind } from 'react-icons/fa'
import { TiWeatherCloudy } from 'react-icons/ti'
import { LuWaves } from 'react-icons/lu'
import { BsFillSunsetFill } from 'react-icons/bs'
import ImageViewModal from '@/components/map/imageViewModal'
import styles from './svg.module.css'

export default function Map() {
  const [selectedMap, setSelectedMap] = useState(null) //存被選的區的id
  const [selectedMapName, setSelectedMapName] = useState('') //存區名 用來放標題
  const [mapDistrictData, setMapDistrictData] = useState([]) //整筆區的資料

  const [selectPoint, setSelectPointData] = useState([]) //潛點
  const [selectedMapInfo, setSelectedMapInfo] = useState(null)

  // 圖片放大及關閉
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    // 根據選中的地圖id篩選about.json的數據
    if (selectedMap) {
      const filteredMapData = mapData.filter((item) => item.id === selectedMap)
      setMapDistrictData(filteredMapData)

      // 設置選中地圖的相關訊息
      const mapInfo = aboutData.filter((item) => item.map_id === selectedMap)
      setSelectedMapInfo(mapInfo)
    }
  }, [selectedMap])

  // 點擊按鈕
  const handleMapButtonClick = (selectedMapId) => {
    // 根據選擇的path ID，找到對應的地圖

    // 當地圖按钮被點擊時更新選定的地圖
    setSelectedMap(selectedMapId)
  }

  // 點擊地圖
  const handleMapClick = (e) => {
    const clickedMapId = e.target.getAttribute('data-id')

    if (clickedMapId) {
      // 清除所有path的active狀態
      document.querySelectorAll('path').forEach((path) => {
        path.classList.remove('active')
      })
    }
    // 將點擊的path設置為active
    e.target.classList.add('active')

    const clickedMap = mapData.find(
      (item) => item.id === parseInt(clickedMapId)
    )

    // 更新選定的地圖
    setSelectedMap(clickedMap.id) //設定被選的
    setSelectedMapName(clickedMap.name) //設定被選的區
  }

  // 點擊潛點
  const handlePointButtonClick = (selectPoint) => {
    setSelectPointData(selectPoint)
    console.log(selectPoint)
  }
  // 圖片放大
  const handleCardImageClick = (imageSrc) => {
    setSelectedImage(imageSrc)
    setShowModal(true)
  }
  // 關閉圖片放大
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <ImageViewModal
        showModal={showModal}
        handleClose={closeModal}
        imageSrc={selectedImage}
        fullscreen={'md-down'}
      />
      {/* Modal↑ */}
      <div style={{ height: '80px' }}></div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div className={styles['box']}>
              <svg
                id="taiwan"
                data-name="taiwan"
                xmlns="http://www.w3.org/2000/svg"
                width="540"
                height="720"
              >
                <g
                  fill="#fff"
                  fillOpacity="0.5"
                  className="layer"
                  onClick={(e) => handleMapClick(e)}
                >
                  <path
                    id="taiwan1"
                    data-id="1"
                    d="M464.05 62.59c-15.15 1.5-30.32 10.4-40.73 21.19-9.99 10.37-18.51 18.33-31.99 25.11-10.71 5.39-14.09 4.92-19.26 14.56-2.29 4.27-3.82 8.02-7.09 11.89-4.3 5.12-11.53 8.16-15.28 13.65-.39.57-.76 1.16-1.1 1.77-2.65-.88-5.06-2.13-6.88-4.05-2.22-2.36-2.3-5.8-4.01-7.77-3.82-4.4-5.29-2.95-11.21-6.56-6.47-3.93-10.07-13.16-15.13-18.69-10.5-11.49-23.55-22.25-37.08-29.97-5.29-3.02-8.62-5-12.19-9.66l-.1-.13c3.49-3.82 7.53-7.29 12.23-10.38 11.18-7.32 20.63-13.32 33.41-17.59 8.18-2.73 28.1-6.02 33.8-13.57 2.26-3 3.6-10.48 5.39-12.41 3.43-3.67 9.66-4.23 13.61-6.73 3.54-2.25 4.92-6.28 9.32-7.79 9.76-3.35 6.06-.47 11.78 3.77 4.93 3.65 9.37 9.47 14.28 13.58 2.12 1.78 5.62 2.21 7.77 3.91 15.61 12.34 11.64 14.04 32.5 14.09 8.24 6.27 18.87 12.61 28.65 17.1.34 1.69.05 3.24-.69 4.68z"
                  ></path>
                  <path
                    id="taiwan2"
                    data-id="2"
                    d="M442.89 79.82c-9.75 12.53-7.78 23.17-7.78 38.7 0 6.92 2.33 15.8 7.55 20.35 2.05 1.8 5.37 4.79 8.22 4.29.32 5.64 1.31 6.22-2.18 9.47-3.16 2.95-4.52 4.75-5.16 9.33-.78 5.57-1.22 8.52-4.46 13.07-3.89 5.45-5.57 7.62-7.44 13.89-1.6 5.43-4.7 11.33-5.29 16.91-.53 5.2.48 7.73-2.95 11.91-1.82 2.23-3.83 4.14-6.48 5.27-3.19 1.35-4.62.76-6.17 3.67-1.2 2.24-1.33 6.92-1.21 9.42.77 14.86-5.99 32.52-7.65 47.36-.71 6.31-1.48 12.6-2.82 18.8-1.03 4.83-3.79 9.84-4.38 14.62-1.36 11-1.65 22.25-3.33 33.47-1.59 10.55-2.5 21.62-5.89 31.79-.92 2.76-1.9 4.89-2.13 7.94-.9 11.63 3.2 22.79-.64 34.39-2.47 7.46-9.04 12.24-8.8 20.59 8.68 11.97-12.79 47.05-21.26 56.04-4.69 4.99-8.57 7.94-13.01 11.68-6.58 5.54-4.54 1.81-7.11 10.07-1.44 4.64-.57 9.46-3.08 14.14-2.87 5.37-9.08 9.41-12.56 14.61-2.6 3.9-4.16 8.3-7.35 11.78-5.56 6.09-18.67 10.31-22.39 17.8-3 6.05-.77 17.83-.72 24.52.12 16.19-5.54 28.04-8.18 43.68-.03.19-.06.38-.08.58-6.17 1.09-9.3-.95-14.35-5.54-3.19-2.9-10.18-8.07-12.52-11.22-3.92-5.28-3.5-20.35-6.07-26.5-7.11-3.48-3.27-7.8-3.51-14.44-.32-9.16-5.2-11.34 1.38-19.7 7.93-10.07 26.7-12.69 25.42-28.09-.66-7.8-6.27-13.36-12.99-17.71-5.29-3.42-7.69-9.91-5.7-15.89.44-1.32.84-3.09 1.27-5.56 1.99-11.05 1.6-21.95 4.82-32.85 2.38-8.03 5.01-14.98 9.95-21.48 4.59-6.05 11.45-10.03 13.6-17.66 1.22-4.31-1.01-9.32.21-13.65.49-1.75 1.27-3.43 2.23-5.06 3.12-5.3 8.17-9.99 11.42-14.72 4.17-6.06 4.53-11.11 6.64-16.64 7-18.36 21.78-30.1 25.36-50.52 2.19-12.54 1.89-25.14 4.36-37.87 1.25-6.5.89-13.52 3.2-19.48 3.18-8.19 9.55-10.29 10.2-18.95.48-6.43-2.9-13.74-1.76-19.82 2.17-11.67 10.86-20.68 11.63-34.01-10.83-11.33-13.55-36.66-5.44-50.9.34-.62.72-1.22 1.11-1.8 3.79-5.54 11.09-8.61 15.42-13.77 3.29-3.91 4.84-7.69 7.16-12 5.21-9.73 8.62-9.26 19.44-14.7 13.61-6.84 22.22-14.89 32.29-25.35 10.51-10.89 25.81-19.87 41.11-21.39-3.44 6.78-16.64 11.28-21.17 17.11l-.01.04z"
                  ></path>
                  <path
                    id="taiwan3"
                    data-id="3"
                    d="M281.23 685.68c.17 1.4 1.38 30.97 1.05 31.53-4.61 8.03-14.33-5.35-19.75-6.98-9.61-2.9-13.73-.61-15.76-14.06-2.38-15.61.88-21.42-9.01-34.28-17.67-22.99-37.16-41.84-63.01-53.96-14.62-6.85-41.53-21.18-47.51-37.81-2.24-6.23 1.03-10.95.32-18.02-.6-5.99-3.54-11.78-6-16.93-5.73-11.97-14.15-21.74-22.66-31.56-6.14-7.07-17.53-17.65-19.62-26.22-2.48-10.18 2.3-24.31 3.16-34.76 2.05-24.74 2.63-50.1 6.46-73.91 3.18-19.77 13.83-36.61 23.48-53.68 21.41 1.36 42.53 4.36 63.29 10.81 14.38-7.85 20.92 7.44 26.03 17.73 1.75 3.49 4.42 10.51 7.53 12.84 4.98 3.74 15.77 2.86 21.76 6.06 11.67 6.24 9.39 16.95 18.05 24.08 9.44 7.77 21.57-.97 30.04 8.44 5.03 5.6 2.06 10.49 4.52 16.25-.97 1.62-1.75 3.31-2.24 5.07-1.23 4.36 1.01 9.37-.21 13.7-2.16 7.66-9.04 11.66-13.64 17.73-4.96 6.52-7.59 13.49-9.99 21.56-3.24 10.94-2.86 21.88-4.84 32.97-.45 2.48-.84 4.25-1.28 5.58-2 5.99.42 12.51 5.72 15.94 6.75 4.37 12.38 9.95 13.04 17.78 1.29 15.46-17.53 18.08-25.51 28.19-6.61 8.4-1.71 10.58-1.39 19.77.24 6.67-3.61 10.99 3.53 14.5 2.57 6.17 2.15 21.29 6.09 26.59 2.33 3.16 9.36 8.36 12.56 11.26 5.07 4.6 8.2 6.66 14.4 5.56-1.75 12.58 8.18 26.14 1.4 38.27l-.03-.03z"
                  ></path>
                  <path
                    id="taiwan4"
                    data-id="4"
                    d="M343.63 254.09c-.65 8.51-6.91 10.59-10.04 18.64-2.28 5.87-1.92 12.78-3.15 19.17-2.43 12.52-2.14 24.93-4.29 37.26-3.52 20.09-18.06 31.64-24.95 49.71-2.08 5.44-2.43 10.42-6.53 16.38-3.2 4.65-8.16 9.27-11.23 14.48-2.41-5.64.51-10.44-4.43-15.93-8.31-9.23-20.2-.67-29.46-8.27-8.49-6.99-6.26-17.48-17.7-23.61-5.87-3.14-16.45-2.27-21.33-5.94-3.04-2.28-5.66-9.17-7.38-12.59-5.02-10.08-11.42-25.07-25.52-17.38-20.35-6.34-41.06-9.27-62.05-10.6 1.51-2.67 2.99-5.35 4.41-8.04 20.18-9.89 32.85-42.75 40.78-62.59 6.25-15.67 13.3-31.34 19.79-46.65 6.11-14.42 12.04-28.97 23.8-39.56 9.78-8.81 30.31-22.43 34.3-35.48 5.51-18.09 11.23-35.2 23.31-48.36l.1.13c3.56 4.63 6.86 6.59 12.11 9.59 13.44 7.67 26.4 18.35 36.83 29.76 5.03 5.49 8.6 14.65 15.03 18.56 5.88 3.58 7.33 2.15 11.13 6.51 1.71 1.96 1.78 5.39 3.98 7.72 1.82 1.92 4.2 3.16 6.83 4.03-7.96 14.01-5.3 38.94 5.35 50.08-.75 13.11-9.31 21.97-11.44 33.46-1.11 6 2.2 13.18 1.73 19.51l.03.01z"
                  ></path>
                </g>
              </svg>
            </div>
          </Col>
          <Col>
            <h3>{selectedMapName}</h3>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                {' '}
                <FaWind />
                25
              </div>
              <div className="p-2">
                <LuWaves />
                123
              </div>
              <div className="p-2">
                <TiWeatherCloudy />
                123
              </div>
              <div className="p-2">
                <BsFillSunsetFill />
                123
              </div>
            </Stack>
            <div>
              <Container fluid className="border">
                {mapDistrictData.map((v) => {
                  const fileNames = v.image.split(',')

                  return (
                    <React.Fragment key={v.id}>
                      {fileNames.map((fileName, index) => (
                        <Card.Img
                          key={index}
                          variant="top"
                          src={`/images/map/${fileName.trim()}`}
                          alt={v.image}
                          onClick={() =>
                            handleCardImageClick(
                              `/images/map/${fileName.trim()}`
                            )
                          }
                        />
                      ))}
                    </React.Fragment>
                  )
                })}
              </Container>
            </div>
          </Col>

          <div>
            {mapData.map((v) => (
              <Button key={v.id} onClick={() => handleMapButtonClick(v.id)}>
                {v.name}
              </Button>
            ))}
          </div>
        </Row>
        <hr />
        <div className="bg-light">
          {selectedMapInfo &&
            selectedMapInfo.map((v) => (
              <DiButton
                key={v.id}
                text={v.name}
                onClick={() => handlePointButtonClick(v.id)}
              />
            ))}
        </div>
        <Container className="border">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Button variant="secondary">相關課程</Button>{' '}
              <div>
                {' '}
                {selectedMapInfo &&
                  selectedMapInfo.map((v) => {
                    const fileNames = v.image.split(',')
                    return (
                      <React.Fragment key={v.id}>
                        {fileNames.map((fileName, index) => (
                          <Card.Img
                            key={index}
                            variant="top"
                            src={`/images/map/${fileName.trim()}`}
                            alt={v.image}
                            onClick={() =>
                              handleCardImageClick(
                                `/images/map/${fileName.trim()}`
                              )
                            }
                          />
                        ))}
                      </React.Fragment>
                    )
                  })}
              </div>
            </div>
          </Stack>
        </Container>
      </Container>
    </>
  )
}

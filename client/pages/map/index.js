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

export default function Map() {
  const [selectedMap, setSelectedMap] = useState(null)
  const [selectedMapName, setSelectedMapName] = useState('')
  const [mapDistrictData, setMapDistrictData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedMapInfo, setSelectedMapInfo] = useState(null)

  // useEffect(() => {
  //   // 根据选中的地图id筛选about.json的数据
  //   if (selectedMap) {
  //     const filteredMapData = mapData.filter((item) => item.id === selectedMap)
  //     setAboutData(filteredMapData)
  //   }
  // }, [selectedMap])

  useEffect(() => {
    // 根据选中的地图id筛选about.json的数据
    if (selectedMap) {
      const filteredMapData = mapData.filter((item) => item.id === selectedMap)
      setMapDistrictData(filteredMapData)

      // 设置选中地图的相关信息
      const mapInfo = aboutData.filter((item) => item.map_id === selectedMap)
      setSelectedMapInfo(mapInfo)
    }
  }, [selectedMap])

  const handleMapButtonClick = (mapId, mapName) => {
    // 当地图按钮被点击时更新选定的地图
    setSelectedMap(mapId)
    setSelectedMapName(mapName)
  }

  const handleCardImageClick = (imageSrc) => {
    setSelectedImage(imageSrc)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <ImageViewModal
        showModal={showModal}
        handleClose={closeModal}
        imageSrc={selectedImage}
        fullscreen={'lg-down'}
      />
      {/* Modal↑ */}
      <Container className="mt-3">
        <div>
          <Row>
            <Col>
              這邊放可按地圖
              <hr />
              {mapData.map((v) => (
                <Button
                  key={v.id}
                  onClick={() => handleMapButtonClick(v.id, v.name)}
                >
                  {v.name}
                </Button>
              ))}
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
          </Row>
        </div>
        <div className="bg-light">
          {selectedMapInfo &&
            selectedMapInfo.map((item) => (
              <DiButton key={item.id} text={item.name} />
            ))}
        </div>
        <Container fluid className="border">
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

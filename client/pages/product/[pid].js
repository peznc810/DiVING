import { useState } from 'react'

import Stars from '@/components/product/star/star'
import Carousel from '@/components/product/carousel'
import ProductRecommond from '@/components/product/product-recommond'

import NavBar from '@/components/layout/default-layout/navbar/'
import Footer from '@/components/layout/default-layout/footer'

export default function Detail() {
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn)
  }

  // const colorBtn = document.querySelector('.color-btn')

  // colorBtn.addEventListener('click', (e) => {
  //   e.currentTarget.classList.add('active')
  // })
  return (
    <>
      <NavBar />
      <div className="container-1200">
        {/* 麵包屑 */}
        <div className="my-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="p-2">
              <i class="bi bi-droplet-half p-1"></i>品牌
            </div>
            <div className="p-1">&gt;</div>
            <div className="p-2">
              <i className="bi bi-droplet p-1"></i>商品種類
            </div>
          </div>
        </div>

        {/* 輪播 */}
        <div className="row mt-5 mx-2">
          <div className="col-sm-7">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <Carousel />
            </div>
          </div>

          <div className="col-sm-5">
            <h3>男士防寒衣</h3>
            <Stars />
            <h6>4.0分 | 8則評價</h6>

            <h6 className="note-text">NT$24,000</h6>
            <p className="text-decoration-line-through type-text">NT$28,000</p>
            <p className="product-desc">
              穿上 Nike Air Force 1 PLT.AF.ORM. 用經典好穿的 AF1 風格脫穎而出。
              優雅版型搭配加厚中底，為籃球鞋系列注入傲嬌新風貌。
            </p>
            <hr />

            {/* 顏色 button */}
            <span className="btn-color p-2">顏色</span>
            <button type="button" className="btn btn-md color-btn">
              紅
            </button>
            <button type="button" className="btn btn-md color-btn">
              藍
            </button>
            <button type="button" className="btn btn-md color-btn">
              綠
            </button>
            <br />
            {/* 尺寸 bottom */}
            <span className="btn-size p-2">尺寸</span>
            <button type="button" className="btn btn-md">
              F
            </button>
            <button type="button" className="btn btn-md">
              S
            </button>
            <button type="button" className="btn btn-md">
              M
            </button>
            <button type="button" className="btn btn-md">
              L
            </button>
            <button type="button" className="btn btn-md">
              XL
            </button>

            {/* 選擇數量 */}
            <div>
              <button type="button" className="btn btn-circle">
                -
              </button>
              <span className="mx-3">數量</span>
              <button type="button" className="btn btn-circle">
                +
              </button>
            </div>

            {/* 加入購物車 */}
            <button
              className="btn btn-secondary w-100 mb-3 my-3"
              style={{ fontWeight: 'bold', color: 'white' }}
            >
              加入購物車 <i className="bi bi-cart-plus-fill"></i>
            </button>
            {/* 加入最愛 */}
            <button className="btn btn-outline-primary w-100">
              <i className="bi bi-person-heart"></i> 加入最愛
            </button>

            {/* 注意事項 */}
            <div className="product-info my-5">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h4 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      尺寸與版型
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body px-1">
                      <ul>
                        <li>版型較大，建議訂購小半號</li>
                        <li>尺寸：尺寸指南</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      免費寄送及退貨
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body px-1">
                      <p>訂單金額滿新臺幣 4,500 元即享免費標準運送服務</p>
                      <p>
                        臺北市:標準運送的商品可於 2-5 個工作天內送達
                        快遞運送的商品可於 2-3 個工作天內送達
                      </p>
                      <p>
                        其它縣市: 標準運送的商品可於 3-6 個工作天內送達
                        快遞運送的商品可於 3-5 個工作天內送達
                      </p>
                      <p>訂單皆於星期一至星期五之間處理與寄送 (國定假日除外)</p>
                      <p>會員享免費退貨服務免費退貨。退貨政策例外情況。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        {/* 轉換按鈕 -- 商品介紹/評價 */}
        <div className="form-check form-switch d-flex justify-content-end">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={isSwitchOn}
            onChange={handleSwitchToggle}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {isSwitchOn ? '顧客評價' : '商品細節'}
          </label>
        </div>
        {isSwitchOn && (
          <div>
            {/* 顯示顧客評價 */}
            <h3 className="text-center my-2">顧客評價</h3>
            <div className="container">
              <form>
                <div className="form-group">
                  <label className="mx-2" for="exampleFormControlTextarea1">
                    來為 --- 評價吧～
                  </label>
                  <Stars />
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="請撰寫評價"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-flex btn-comment"
                >
                  送出評價
                </button>
              </form>
            </div>
            {/* 用戶評價 */}
            <div className="mt-5 d-flex align-items-center justify-content-center">
              <div className="mt-2">
                <h6>安妮雅 2024/01/01</h6>
                <Stars />
                <p>
                  若沒有潛水的存在，那麼後果可想而知。亦舒曾經說過，人生短短數十載，最要緊的是滿足自己，不是討好他人。這影響了我的價值觀。
                </p>
                <hr />
                <button
                  type="submit"
                  className="btn btn-primary d-flex btn-comment"
                >
                  更多評價
                </button>
              </div>
            </div>

            {/* 隨機商品 */}
            <div>
              <h3 className="text-center my-5">你可能會喜歡的商品⋯</h3>
              <ProductRecommond />
            </div>
          </div>
        )}
        {!isSwitchOn && (
          <div>
            {/* 顯示商品細節 */}
            <h3 className="text-center my-2">商品介紹</h3>

            {/* 商品介紹 */}
            <div className="row mt-2 mx-2">
              <div className="col-sm-12">
                <p className="text-center my-3 font-weight-light">
                  鞋面採用車縫皮革裝飾片，全面提升經典指標性、耐久性和支撐力。
                </p>
                <img
                  className="w-50 p-2 my-3"
                  src="./public/images/product/test/20/20-detail1.jpg"
                />
                <img
                  className="w-50 p-2 my-3"
                  src="./public/images/product/test/20/20-detail1.jpg"
                />
                <img
                  className="w-100 h-50 mb-1"
                  src="/images/product/detail/info-2.webp"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />

      <style jsx>{`
        .container-1200 {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
          }
          @media screen and (max-width: 576px) {
            .width-1200 {
            width: 380px;
        }}
        
        {/* 商品細節 */}
        {/* h1 {
        font-size: 36px;
        }
        h2 {
        font-size: 32px;
        }
        h3 {
        font-size: 28px;
        }
        h4 {
        font-size: 24px;
        }
        h5 {
        font-size: 20px;
        }
        h6 {
        font-size: 18px;
        }
        p {
        font-size: 16px;
        }
        span {
        font-size: 16px;
        } */}
        .note-text {
        color: var(--red, #dc5151);
        }
        .type-text {
        color: var(--gray, #858585);
        font-weight: normal;
        }

        
        {/* hover */}
        .btn-md:hover,
        .btn-outline-primary:hover,
        .btn-circle:hover {
          background-color: #265475;
          color: #fff;
        }
        .btn-comment {
          background-color: #265475;
          margin: 18px auto;
          border-radius: 100px;
          padding: 10px 20px;
        }
        .btn-color {
          margin: 5px 0;
        }
        .btn-size {
          margin: 5px 0;
        }
        .btn-circle {
          margin: 5px 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f5f5f5;
          font-size: 16px;
        }
        .circle-container {
          display: flex;
          align-items: center;
        }

        {/* 推薦商品 */}
        .container-with-button {
          display: flex;
          justify-content: center;
          align-items: center;
          
        .btn-arrow-circle {
          margin: 0 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f5f5f5;
          font-size: 16px;
        }
        .btn-left {
          margin-right: 10px;
        }
        .card-container {
          display: flex;
          justify-content: space-between;
        }
        .wrap-card {
          position: relative;
        }

        .tag {
          position: absolute;
          top: 20;
          left: 20;
          background-color: var(--red, #dc5151);
          color: white; 
          padding: 5px 10px; 
          border-radius: 5px; 
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 30px;
          box-shadow: 2px 4px 6.1px 0px rgba(20, 35, 56, 0.4);
        }
        .card-bottom {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 12px;
        }
        .card-title {
          color: var(--neutral-07100, #141718);
          text-align: center;
          font-feature-settings: 'clig' off, 'liga' off;
          letter-spacing: 0.8px;
          font: 500 16px Inter, sans-serif;
        }
        .discount-price-wrap {
          justify-content: center;
          align-self: center;
          display: flex;
          margin-top: 12px;
          gap: 12px;
          white-space: nowrap;
        }
        .discount-price {
          color: var(--red, #dc5151);
          font-feature-settings: 'clig' off, 'liga' off;
          flex-grow: 1;
          font: 500 16px Inter, sans-serif;
        }
        .o-price {
          justify-content: center;
          color: var(--gray, #858585);
          margin: auto 0;
          padding: 2px 8px 2px 3px;
          font: 400 14px Arial, sans-serif;
        }
        
       
      `}</style>
    </>
  )
}

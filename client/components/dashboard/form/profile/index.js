import React from 'react'
import styles from './styles.module.scss'

export default function Form() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                {/* 按鈕需要下一個路徑判斷來顯示橘色背景 */}
                <button
                  className="fw-medium fs-5 accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  個人資料
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <form action="">
                  <div className="accordion-body">
                    <div className="row gy-4">
                      <div className="col-12 col-sm-6">
                        <label htmlFor="myName" className="form-label">
                          姓名
                        </label>
                        <input
                          type="text"
                          id="myName"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label htmlFor="myBirth" className="form-label">
                          生日
                        </label>
                        <input
                          type="date"
                          id="myBirth"
                          className="form-control"
                        />
                      </div>
                      {/* 改的話要再註冊驗證一次 */}
                      <div className="col-12 col-sm-6">
                        <label htmlFor="myEmail" className="form-label">
                          電子郵件
                        </label>
                        <input
                          type="email"
                          id="myEmail"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label htmlFor="myTel" className="form-label">
                          電話號碼
                        </label>
                        <input type="tel" id="myTel" className="form-control" />
                      </div>
                      <div className="col-9">
                        <label htmlFor="address" className="form-label">
                          聯絡地址
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 text-end">
                        <button
                          type="button"
                          className={`btn btn-outline-secondary me-3 ${styles['hover-style']}`}
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          className="btn btn-secondary text-white"
                        >
                          儲存變更
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="fw-medium fs-5 accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  密碼管理
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <form action="">
                  <div className="accordion-body">
                    <div className="row gy-1">
                      <div className="col-6 me-1 pb-4 position-relative">
                        <label htmlFor="password" className="form-label">
                          舊密碼
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                        />
                        {/* 還是改成紅色border + 叉叉icon？ */}
                        <div
                          id="emailHelp"
                          className="form-text text-danger ps-1 position-absolute bottom-0"
                        >
                          密碼錯誤
                        </div>
                      </div>
                      <div className="col-6 me-1 pb-4">
                        <label htmlFor="newPassword" className="form-label">
                          新密碼
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="form-control"
                        />
                      </div>
                      <div className="col-6 me-1 pb-4 position-relative">
                        <label htmlFor="rePassword" className="form-label">
                          確認密碼
                        </label>
                        <input
                          type="password"
                          id="rePassword"
                          className="form-control"
                        />
                        <div
                          id="emailHelp"
                          className="form-text text-danger ps-1 position-absolute bottom-0 d-none"
                        >
                          密碼錯誤
                        </div>
                      </div>
                      <div className="col-12 text-end">
                        <button
                          type="submit"
                          className="btn btn-secondary text-white"
                        >
                          儲存變更
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

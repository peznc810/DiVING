import React from 'react'
import { TbArrowBack } from 'react-icons/tb'

export default function BackButton() {
  return (
    <>
      <button className={'button-back'}>
        <TbArrowBack /> 回列表頁
      </button>

      <style jsx>{`
        .button-back {
          background-color: #fff;
          border-radius: 17px;
          border: #013c6468 solid 1px;
          box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
          color: #013c64;
          cursor: pointer;
          display: inline-block;
          line-height: 23px;
          outline: none;
          padding: 0.75rem;
          text-decoration: none;
          transition: all 235ms ease-in-out;
        }

        .button-back:hover {
          box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
          transform: translate3d(0, 2px, 0);
        }

        .button-back:focus {
          box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
        }
      `}</style>
    </>
  )
}
/* CSS */

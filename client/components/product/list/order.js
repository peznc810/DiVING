import { useMemo, useEffect, useState } from 'react'

import { MdReplyAll } from "react-icons/md";
import { MdFiberNew } from "react-icons/md";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { FaSortNumericDownAlt } from "react-icons/fa";

export default function OrderProduct() {
  const [product, setProduct] = useState(null);    

  useEffect(() => { 
    fetch("http://localhost:3000/api/product").then((res) => {
        return res.json()
    }).then((data)=> setProduct(data))
  }, [])

  const items = useMemo(() => {
    if (!product) return [];
    return product.data
  }, [product])
  // console.log(items)

  // const items = useMemo(() => {
  //   if (!product || !product.data || !Array.isArray(product.data)) {
  //     console.log("Product data is not an array:", product.data);
  //     return [];
  //   }
  //   return product.data;
  // }, [product]);

  //排序
  // 全部商品
  const sortAllProducts = () => {
    const allSortedProducts = [...items].sort((a, b) => a.id - b.id);
    setProduct(allSortedProducts);
  };

  // 上架時間
  const sortCreatedDate = () => {
    const sortedDate = [...items].sort((a, b) => a.created_at - b.created_at);
    setProduct(sortedDate);
  };

  // 金額
  const sortAscending = () => {
    const sortedProducts = [...items].sort((a, b) => {
      if (a.discount && b.discount) {
        return a.discount - b.discount;
      } else if (a.discount) {
        return -1;
      } else if (b.discount) {
        return 1;
      } else {
        return a.price - b.price;
      }
    });
    setProduct({ ...product, data: sortedProducts });
  };

  const sortDescending = () => {
    const sortedProducts = [...items].sort((a, b) => {
      if (a.discount && b.discount) {
        return a.discount - b.discount;
      } else if (a.discount) {
        return -1;
      } else if (b.discount) {
        return 1;
      } else {
        return a.price - b.price;
      }
    });
    setProduct({ ...product, data: sortedProducts });
  };


  return (
    <>
      <div className="d-flex p-2 justify-content-end align-items-center">
        <div className="toolbar">
          <button className="btn" id="sidebarToggle">
            隱藏篩選條件 <i className="bi bi-toggles"></i>
          </button>
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            商品排序
          </button>
          <ul className="dropdown-menu">
          <li>
              <a 
              className="dropdown-item" 
              href="#"
              onClick={sortAllProducts}
              >
                <MdReplyAll /> 所有商品
              </a>
            </li>
            <li>
              <a 
              className="dropdown-item" 
              href="#"
              onClick={sortCreatedDate}
              >
               <MdFiberNew /> 最新上架商品
              </a>
            </li>
            <li>
              <a 
              className="dropdown-item" 
              href="#"
              onClick={sortAscending}
              >
                <FaSortNumericUpAlt /> 價格：由高至低
              </a>
            </li>
            <li>
              <a 
              className="dropdown-item" 
              href="#"
              onClick={sortDescending}
              >
                <FaSortNumericDownAlt /> 價格：由低至高
              </a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        #sidebarToggle:hover {
          background-color: #ff9720;
          color: #fff;
          border: none;
        }
        .dropdown-item:hover,
        .dropdown-toggle:hover {
          background-color: #265475;
          color: #fff;
          border: none;
        }
      `}</style>
    </>
  )
}

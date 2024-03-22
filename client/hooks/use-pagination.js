import { useState } from 'react'

function usePagination(item, maxCount) {
  //初始頁
  const [currentPage, setCurrentPage] = useState(1)
  //每頁最後一個項目的索引值
  const lastIndex = maxCount * currentPage
  // 每頁第一個項目的索引值
  const firstIndex = lastIndex - maxCount
  // 當前頁面的項目
  const pageItem = item.slice(firstIndex, lastIndex)
  // 總頁數
  const totalPages = Math.ceil(item.length / maxCount)

  // 點擊換頁
  const handlePage = (pageNum) => {
    setCurrentPage(pageNum)
  }

  // 取得頁數陣列
  const getPageNumbers = () => {
    return [...Array(totalPages).keys()].map((v) => v + 1)
  }

  return {
    currentPage,
    pageItem,
    totalPages,
    handlePage,
    getPageNumbers,
  }
}

export default usePagination

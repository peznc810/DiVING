import { useState } from 'react'

function usePagination(item, maxCount) {
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = maxCount * currentPage
  const firstIndex = lastIndex - maxCount
  const pageItem = item.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(item.length / maxCount)

  const handlePage = (pageNum) => {
    setCurrentPage(pageNum)
  }

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

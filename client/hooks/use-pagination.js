import { useState } from 'react'

const usePage = (itemsCount, currentPage, ItemData) => {
  const itemsPrePage = itemsCount
  // 分頁
  const lastItemIndex = itemsPrePage * currentPage //計算當前頁面“最後一個”品項的索引範圍
  const firstItemIndex = lastItemIndex - itemsPrePage //計算當前頁面“起始”品項的索引
  const currentItems = ItemData.slice(firstItemIndex, lastItemIndex) //擷取出商品範圍，得到當前頁面該顯示的商品
  return currentItems
  //   const totalPages = Math.ceil(ItemData.length / itemsPrePage) //算出頁數
}

const useTotal = (itemsCount, ItemData) => {
  const totalPages = Math.ceil(ItemData.length / itemsCount) //算出頁數
  return totalPages
}

export default function usePagination({ itemsCount = 0, totalData = [] }) {
  const itemsPrePage = itemsCount //設定每頁?個
  const [currentPage, setCurrentPage] = useState(1) //初始值為第一頁
  const [filterItems, setFilterItems] = useState(totalData)

  // 分頁
  const lastItemIndex = itemsPrePage * currentPage //計算當前頁面“最後一個”品項的索引範圍
  const firstItemIndex = lastItemIndex - itemsPrePage //計算當前頁面“起始”品項的索引
  const currentItems = filterItems.slice(firstItemIndex, lastItemIndex) //擷取出商品範圍，得到當前頁面該顯示的商品

  const totalPages = Math.ceil(filterItems.length / itemsPrePage) //算出頁數

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const prePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // 篩選 & 收尋
  //(子女)要傳進篩選、收尋結果的狀態
  const onFilter = (filterSort) => {
    // 篩選活動
    const filtered =
      filterSort === 'all'
        ? totalData
        : totalData.filter((event) => filterSort === event.sort)

    // 渲染更新的活動列表
    setCurrentPage(1) //前頁數重置第一頁
    setFilterItems(filtered)
  }

  const onSearch = (keyWord, filterSort) => {
    // 收尋活動
    const filtered =
      filterSort === 'all'
        ? totalData
        : totalData.filter((event) => filterSort === event.sort)
    const searched = filtered.filter((event) =>
      event.title.toUpperCase().includes(keyWord.toUpperCase())
    )

    setFilterItems(searched)
  }

  return {
    currentPage,
    firstItemIndex,
    totalPages,
    setCurrentPage,
    nextPage,
    prePage,
    currentItems,
    onFilter,
    onSearch,
  }
}

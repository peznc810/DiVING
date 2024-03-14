export const menuItems = [
  {
    id: '1',
    label: '首頁',
    href: '/',
  },
  {
    id: '2',
    label: '活動資訊',
    href: '/event',
  },
  {
    id: '3',
    label: '所有商品',
    href: '/product',
    children: [
      { id: '31', label: 'HeleiWaho', href: '/product' },
      { id: '32', label: 'OceanMax', href: '/product' },
      { id: '33', label: 'MYSTIC', href: '/product' },
      { id: '34', label: 'ADISI', href: '/product' },
      { id: '35', label: 'AROPEC', href: '/product' },
      { id: '36', label: 'Princeton Tec', href: '/product' },
      { id: '37', label: 'Unidive', href: '/product' },
    ],
  },
  {
    id: '4',
    label: '課程資訊',
    href: '/lesson',
    children: [
      { id: '41', label: '自由潛水', href: '/lesson/free-diving' },
      { id: '42', label: '水肺潛水', href: '/lesson/scuba-diving' },
      { id: '43', label: '技術潛水', href: '/lesson/technical-diving' },
      { id: '44', label: '技術教練課程', href: '/lesson/coach-lesson' },
    ],
  },
  {
    id: '5',
    label: '潛點地圖',
    href: '/map',
  },
]

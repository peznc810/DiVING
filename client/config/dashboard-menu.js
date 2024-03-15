import { GoPerson } from 'react-icons/go'
import { RiFileList2Line } from 'react-icons/ri'
import { TbMessage } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { HiOutlineTicket } from 'react-icons/hi'

export const menuItems = [
  {
    pathname: 'profile',
    label: '個人資訊',
    icon: <GoPerson />,
  },
  {
    pathname: 'orders',
    label: '訂單記錄',
    icon: <LuClipboardList />,
  },
  {
    pathname: 'coupons',
    label: '優惠券',
    icon: <HiOutlineTicket />,
  },
  {
    pathname: 'comments',
    label: '我的評論',
    icon: <TbMessage />,
  },
  {
    pathname: 'favorites',
    label: '我的收藏',
    icon: <FaRegHeart />,
  },
  {
    pathname: 'posts',
    label: '我的文章',
    icon: <RiFileList2Line />,
  },
]

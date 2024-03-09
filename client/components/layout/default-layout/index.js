import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ currentPage, children }) {
  // 判斷路徑如果是/home 改變nav背景色
  const navBackground = currentPage === '/' ? 'transparent' : '#013c64'

  return (
    <>
      <Navbar background={navBackground} />
      <div style={{ paddingTop: '60px' }}>{children}</div>
      <Footer />
    </>
  )
}

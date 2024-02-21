import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

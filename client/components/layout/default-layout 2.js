import Navbar from './default-layout/navbar'
import Footer from './default-layout/footer'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

// import MyNavbar from './my-navbar-nouse'
import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Navbar />
      <main className="flex-shrink-0 mt-3">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  )
}

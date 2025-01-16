import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
          <p className="text-xl mb-8">抱歉，您请求的页面不存在。</p>
          <Link href="/" className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors">
            返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}


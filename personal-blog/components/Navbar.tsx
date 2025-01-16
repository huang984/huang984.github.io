import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              My Blog
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                首页
              </Link>
              <Link href="/blog" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                博客
              </Link>
              <Link href="/about" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                关于
              </Link>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}


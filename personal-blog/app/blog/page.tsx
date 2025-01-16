import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { TagList } from '../../components/TagList'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { SearchIcon } from 'lucide-react'

export default function BlogList({ searchParams }: { searchParams: { page?: string, search?: string } }) {
  const allPosts = getSortedPostsData()
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''
  const postsPerPage = 10

  const filteredPosts = search
    ? allPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    : allPosts

  const paginatedPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <h1 className="text-4xl font-bold mb-8">博客文章</h1>
        
        <form className="mb-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="搜索文章..."
              defaultValue={search}
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <div className="space-y-6 mb-8">
          {paginatedPosts.map(post => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
              <Link href={`/blog/${post.id}`} className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {post.title}
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                {formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: zhCN })}
              </p>
              <div className="mt-2">
                <TagList tags={post.tags} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {page > 1 && (
            <Link 
              href={`/blog?page=${page - 1}&search=${search}`} 
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
            >
              上一页
            </Link>
          )}
          {page < totalPages && (
            <Link 
              href={`/blog?page=${page + 1}&search=${search}`} 
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
            >
              下一页
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


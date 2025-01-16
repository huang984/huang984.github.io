import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8">关于我</h1>
        <div className="prose lg:prose-xl">
          <p>
            欢迎来到我的博客！我是一名热爱技术和写作的开发者。通过这个博客，我希望能够分享我在软件开发、
            Web技术和其他相关领域的经验和见解。
          </p>
          <p>
            我的目标是创建一个学习和交流的平台，在这里我们可以讨论最新的技术趋势，分享编程技巧，
            并探讨软件开发中的各种挑战和解决方案。
          </p>
          <p>
            如果你对我的文章有任何问题、建议或者想要深入讨论某个话题，欢迎随时与我联系。让我们一起在这个
            快速发展的技术世界中学习和成长！
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}


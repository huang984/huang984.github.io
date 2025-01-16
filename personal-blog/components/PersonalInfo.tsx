import Image from 'next/image'
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react'

export function PersonalInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src="/placeholder.svg"
            alt="Your Name"
            width={150}
            height={150}
            className="h-48 w-full object-cover md:w-48"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">个人博客</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">您的名字</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            这里是您的简短介绍。例如：我是一名热爱技术和写作的全栈开发者。通过这个博客，我分享我在软件开发和Web技术方面的经验和见解。
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <GithubIcon size={24} />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <TwitterIcon size={24} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <LinkedinIcon size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


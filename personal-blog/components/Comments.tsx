'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

export function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${postId}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [postId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && author.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: author,
        createdAt: new Date().toISOString(),
      }
      const updatedComments = [...comments, comment]
      setComments(updatedComments)
      localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments))
      setNewComment('')
      setAuthor('')
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">评论</h2>
      <div className="space-y-4 mb-8">
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">
              {comment.author} - {format(new Date(comment.createdAt), 'PPP', { locale: zhCN })}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block mb-2">名字：</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2">评论：</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          提交评论
        </button>
      </form>
    </div>
  )
}


import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogView = () => {
  const { id } = useParams()
  const posts = useSelector(s => s.blogs?.posts || [])
  const post = posts.find(p => p.id === id)

  if (!post) return <div className="max-w-4xl mx-auto my-8 px-4">Post not found</div>

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="mb-4">
        <Link to="/blog" className="text-sm text-[#4e4e4e] hover:underline">← Back to Blog</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">By {post.author || 'Indiaonroaming Pvt Ltd'} • {new Date(post.createdAt).toLocaleString()}</div>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold">Tags</h4>
          <div className="flex gap-2 mt-2">
            {post.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogView

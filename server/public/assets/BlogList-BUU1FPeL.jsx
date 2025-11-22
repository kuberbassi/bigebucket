import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../store/blogSlice'
import { FaTimes } from 'react-icons/fa'


const BlogList = () => {
  const posts = useSelector(s => s.blogs?.posts || [])
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const [q, setQ] = useState('')
  const [modalPost, setModalPost] = useState(null)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    const visible = user?.role === 'admin' ? posts : posts.filter(p => p.approved)
    if (!term) return visible
    return visible.filter(p => (p.title + ' ' + (p.excerpt || '') + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(term))
  }, [posts, q, user])

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <div className="flex items-center gap-3">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search posts..." className="px-3 py-2 border rounded-md" />
          <Link to="/blog/create" className="px-3 py-2 bg-green-600 text-white rounded-md">Create Post</Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 py-12">No posts yet. Create the first post.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <div key={post.id} className="border rounded-md overflow-hidden bg-white shadow-sm">
              <div className="h-48 bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => setModalPost(post)}>
                {post.imageUrl ? (
                  // show image
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full" />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="p-4">
                <Link to={`/blog/${post.id}`} className="text-lg font-semibold hover:underline">{post.title}</Link>
                <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-500">By {post.author || 'Indiaonroaming Pvt Ltd'}</div>
                  <div className="flex gap-2">
                    {user?.role === 'admin' && <Link to={`/blog/${post.id}/edit`} className="px-2 py-1 border rounded text-xs">Edit</Link>}
                    {user?.role === 'admin' && <button onClick={() => dispatch(deletePost(post.id))} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>}
                    <Link to={`/blog/${post.id}`} className="px-2 py-1 border rounded text-xs">View</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={()=>setModalPost(null)} />
          <div className="bg-white max-w-3xl w-full mx-4 rounded shadow-lg z-10 overflow-auto max-h-[90vh]">
            <div className="p-4 flex justify-between items-start">
              <h3 className="text-lg font-semibold">{modalPost.title}</h3>
              <button onClick={()=>setModalPost(null)} className="text-gray-600"><FaTimes /></button>
            </div>
            {modalPost.imageUrl && <img src={modalPost.imageUrl} alt={modalPost.title} className="w-full object-cover max-h-96" />}
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">By {modalPost.author} • {new Date(modalPost.createdAt).toLocaleString()}</div>
              <div className="prose">
                <p>{modalPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList

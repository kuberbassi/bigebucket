import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../store/blogSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const COMPANY = {
  name: 'Indiaonroaming Pvt Ltd',
  email: 'ops@indiaonroaming.com',
  mobile: '+91 96509 01450',
  address: 'G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058',
  app: 'https://bigebucket.com'
}

const BlogCreate = () => {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(s => s.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return alert('Please enter title')
    // prepare post skeleton
    const post = {
      id: Date.now().toString(),
      title: title.trim(),
      excerpt: excerpt.trim() || content.slice(0, 120),
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author: COMPANY.name,
      contact: { email: COMPANY.email, mobile: COMPANY.mobile },
      createdAt: new Date().toISOString()
    }

    const doSave = async () => {
      try {
        if (file) {
          const fd = new FormData()
          fd.append('file', file)
          // try server upload first
          try {
            const res = await Axios({
              url: SummaryApi.uploadImage.url,
              method: SummaryApi.uploadImage.method,
              data: fd,
              headers: { 'Content-Type': 'multipart/form-data' }
            })
            // expect {data: {url: '...'}} or similar; fallback to data
            const imageUrl = res?.data?.data?.url || res?.data?.url || null
            if (imageUrl) post.imageUrl = imageUrl
          } catch (uploadErr) {
            // fallback: encode as base64 locally
            const reader = new FileReader()
            const base = await new Promise((resolve, reject) => {
              reader.onload = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsDataURL(file)
            })
            post.imageUrl = base
          }
        }

        // default approval: admins auto-approve, others go to pending
        if (user?.role === 'ADMIN') {
          post.approved = true
          post.status = 'approved'
        } else {
          post.approved = false
          post.status = 'pending'
        }

        dispatch(addPost(post))
        // give feedback to user
        if (post.approved) {
          alert('Post published successfully')
        } else {
          alert('Post submitted for review. It will appear on the public gallery once approved by an admin.')
        }
        navigate('/blog')
      } catch (err) {
        console.error('Failed to save post', err)
        alert('Failed to create post')
      }
    }

    doSave()
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea value={content} onChange={e=>setContent(e.target.value)} rows={10} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input value={tags} onChange={e=>setTags(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Publish</button>
          <button type="button" onClick={()=>navigate('/blog')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default BlogCreate

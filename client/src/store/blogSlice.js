import { createSlice } from '@reduxjs/toolkit'

const LOCAL_KEY = 'io_rb_blogs_v1'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

const saveToStorage = (data) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
  } catch (e) {
    // ignore
  }
}

const initialState = {
  posts: loadFromStorage(),
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload || []
      saveToStorage(state.posts)
    },
    addPost(state, action) {
      // action.payload should be a post object
      state.posts = [action.payload, ...state.posts]
      saveToStorage(state.posts)
    },
    updatePost(state, action) {
      const updated = action.payload
      state.posts = state.posts.map(p => (p.id === updated.id ? { ...p, ...updated } : p))
      saveToStorage(state.posts)
    },
    deletePost(state, action) {
      const id = action.payload
      state.posts = state.posts.filter(p => p.id !== id)
      saveToStorage(state.posts)
    },
    approvePost(state, action) {
      const id = action.payload
      state.posts = state.posts.map(p => p.id === id ? { ...p, approved: true, status: 'approved' } : p)
      saveToStorage(state.posts)
    },
    rejectPost(state, action) {
      const id = action.payload
      state.posts = state.posts.map(p => p.id === id ? { ...p, approved: false, status: 'rejected' } : p)
      saveToStorage(state.posts)
    },
    clearPosts(state) {
      state.posts = []
      saveToStorage(state.posts)
    }
  }
})

export const { setPosts, addPost, updatePost, deletePost, approvePost, rejectPost, clearPosts } = blogSlice.actions

export default blogSlice.reducer

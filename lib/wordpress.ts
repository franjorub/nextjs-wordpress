import axios from 'axios'
import { Post } from './types'

export const POSTS_API_URL =
  'https://wordpress-headless.000webhostapp.com/wp-json/wp/v2/posts'
export const AUTHORS_API_URL =
  'https://wordpress-headless.000webhostapp.com/wp-json/wp/v2/users'
export const MEDIA_API_URL =
  'https://wordpress-headless.000webhostapp.com/wp-json/wp/v2/media'


export const getPostById = async (id: string) => {
    try {
        const { data } = await axios.get(`${POSTS_API_URL}/${id}`)
        return data as Post
    } catch (error) {
        console.log(error)
    }
}

export const getAllPostsFromServer = async () => {
  //   get all posts from Server
  try {
    const { data } = await axios.get(POSTS_API_URL)
    return data as Post[]
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getAllPostsPaths = async () => {
  try {
    const posts = await getAllPostsFromServer()
    return posts.map((post) => ({ params: { id: post.id.toString() } }))
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getAuthor = async (id: number) => {
  try {
    const {
      data: { name },
    } = await axios.get(`${AUTHORS_API_URL}/${id}`)
    return name as string
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getFeaturedImage = async (id: number) => {
  try {
    const res = await axios.get(`${MEDIA_API_URL}/${id}`)
    return res.data.guid.rendered as string
  } catch (error) {
    console.log(error)
    return ''
  }
}

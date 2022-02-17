import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'
import { Post as PostType } from '../lib/types'
import { getAuthor, getFeaturedImage } from '../lib/wordpress'

export type PostProps = {
  post: PostType
}

export const Post: FC<PostProps> = ({ post }) => {
  const [author, setAuthor] = useState('')
  const [featuredImg, setFeaturedImg] = useState('')

  useEffect(() => {
    Promise.all([
      getAuthor(post.author),
      getFeaturedImage(post.featured_media),
    ]).then((res) => {
      setAuthor(res[0])
      setFeaturedImg(res[1])
    })
  }, [post.author, post.featured_media])

  return (
    <div className="grid place-items-center rounded-lg border-2 border-gray-50 p-4 hover:shadow-sm bg-gradient-to-br from-gray-100">
      <div className="relative mb-5 h-72 w-80 lg:h-80 lg:w-96">
        {featuredImg && <Image src={featuredImg} layout="fill" sizes="50vw" />}
      </div>

      <Link href={`/posts/${post.id}`}>
        <a className="text-4xl font-bold hover:text-gray-500">
          {post.title.rendered}
        </a>
      </Link>
      <h4>{new Date(post.date).toDateString()}</h4>
      <div className="relative mt-2">
        <div className="mb-2 max-w-lg">{parse(post.excerpt.rendered)}</div>
        <Link href={`/posts/${post.id}`}>
          <a className="bottom-0 mt-3 text-blue-800 hover:text-blue-400">
            Continue reading
          </a>
        </Link>
      </div>
    </div>
  )
}

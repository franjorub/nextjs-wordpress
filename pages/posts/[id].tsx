import HTMLReactParser from 'html-react-parser'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  getAllPostsPaths,
  getAuthor,
  getFeaturedImage,
  getPostById,
} from '../../lib/wordpress'
import styles from '../../styles/Post.module.css'

export type PostProps = {
  title: string
  content: string
  featuredImg: string
  author: string
  date: string
}

export default function Post({
  title,
  featuredImg,
  author,
  content,
  date,
}: PostProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto mx-5 flex max-w-5xl flex-1 flex-col items-center py-10 md:px-20">
        <h1 className="mt-5 mb-5 text-center text-2xl font-bold md:text-6xl">
          {title}
        </h1>
        <div className="relative mb-5 h-80 w-96">
          {featuredImg && <Image src={featuredImg} layout="fill" />}
        </div>
        <p className="mt-5 text-sm">Written by {author}</p>
        <p className="mb-5 text-sm font-semibold">
          Published on {new Date(date).toDateString()}
        </p>
        <div className={styles.post}>{HTMLReactParser(content)}</div>
      </main>
      <footer>
          <Link href='/'>
            <a className='text-blue-500 text-lg'>Back home</a>
          </Link>
      </footer>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostsPaths()
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostById(params?.id as string)
  const featuredImg = await getFeaturedImage(post?.featured_media as number)
  const author = await getAuthor(post?.author as number)
  return {
    props: {
      title: post?.title.rendered,
      content: post?.content.rendered,
      featuredImg,
      author,
      date: post?.date,
    },
  }
}
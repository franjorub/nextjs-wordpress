import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Post } from '../components/Post'
import { Post as PostType } from '../lib/types'
import { getAllPostsFromServer } from '../lib/wordpress'

export type HomeProps = {
  posts: PostType[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen p-4">
      <Head>
        <title>Next.js ❤️ Wordpress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mt-8 text-center text-5xl">
        WordPress Meetup <br /> San Cristóbal
      </h1>

      <div className="flex justify-center">
        <main className="mt-10 grid w-auto place-items-center gap-6 sm:grid-cols-1 lg:w-3/4 lg:grid-cols-2">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </main>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllPostsFromServer()
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

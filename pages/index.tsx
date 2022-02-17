import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Post } from '../components/Post'
import { Post as PostType} from '../lib/types'
import { getAllPostsFromServer } from '../lib/wordpress'

export type HomeProps = {
  posts: PostType[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Next.js ❤️ Wordpress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        { posts.map(post => <Post post={post} key={post.id} />)}
      </main>

      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllPostsFromServer()
  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

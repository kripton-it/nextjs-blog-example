import Head from 'next/head'

import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData  } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// dev: runs on every request
// prod: runs at build time
/*
If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page
https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
https://nextjs.org/docs/routing/dynamic-routes
*/
export const getStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false
})

export const getStaticProps = async ({ params }) => ({
  props: {
    postData: await getPostData(params.id)
  }
})
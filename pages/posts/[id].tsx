import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'

import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData  } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

interface IPostData {
  contentHtml: string
  date: string
  title: string
}

interface IPostProps {
  postData: IPostData
}

export default function Post(props: IPostProps) {
  const { postData } = props
  const { contentHtml, date, title } = postData

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false
})

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    postData: await getPostData(params.id as string)
  }
})
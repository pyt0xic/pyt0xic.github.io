import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="diveide-ctp-y diveide-ctp-base-200 dark:diveide-ctp-base-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-ctp-white text-3xl font-extrabold leading-9 tracking-tight dark:text-ctp-lavender sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-ctp-lg text-ctp-white dark:text-ctp-subtext leading-7">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="diveide-ctp-base divide-y dark:divide-ctp-base">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-ctp-blue font-medium leading-6 text-ctp-blue dark:text-ctp-blue">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-ctp-lavender dark:text-ctp-lavender"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-ctp-text dark:text-ctp-text">
                          {summary}
                        </div>
                      </div>
                      <div className="text-ctp-lavender font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-ctp-primary hover:text-ctp-teal dark:hover:text-ctp-teal"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-ctp-teal font-medium leading-6">
          <Link
            href="/blog"
            className="text-ctp-primary hover:text-ctp-teal dark:hover:text-ctp-teal"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

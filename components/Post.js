import Link from 'next/link'

export default function Post({ post }) {
  return (
    <div className='card'>
      <img src={`${process.env.NEXT_PUBLIC_ENDPOINT_BASE_URL}${post.attributes.cover_image.data.attributes.url}`} alt={post.attributes.cover_image.data.attributes.name} />

      <div className='post-date'>Posted on {post.attributes.date}</div>

      <h3>{post.attributes.title}</h3>

      <p>{post.attributes.excerpt}</p>

      <Link href={`/blog/${post.attributes.slug}`}>
        <a className='btn'>Read More</a>
      </Link>
    </div>
  )
}

import Link from 'next/link';
import { gql, GraphQLClient } from 'graphql-request';
import { marked } from 'marked';

export default function PostPage({
  post: {attributes: { title, slug, content, date, cover_image }
}}) {
  return (
    <>
      <Link href='/'>
        <a className='btn btn-back'>Go Back</a>
      </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <img src={`${process.env.NEXT_PUBLIC_ENDPOINT_BASE_URL}${cover_image.data.attributes.url}`} alt={cover_image.data.attributes.name} />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }}></div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async pageContext => {
    const url = `${process.env.ENDPOINT_BASE_URL}/graphql`;
    const graphQLClient = new GraphQLClient(url, {
    //   headers: {
    //     Authorization: process.env.GRAPH_CMS_TOKEN
    //   }
    });
    const pageSlug = pageContext.query.slug;
    const query = gql`
      query ($pageSlug: String!) {
        postBySlug(slug: $pageSlug) {
          data {
            id
            attributes {
              title
              excerpt
              slug
              date
              cover_image {
                data {
                  attributes {
                    name
                    url
                    alternativeText
                  }
                }
              }
              content
            }
          }
        }
      }
    `;
    const variables = { pageSlug };
    const data = await graphQLClient.request(query, variables);
    const post = data.postBySlug.data;
    return {
      props: {
        post
      }
    };
  };
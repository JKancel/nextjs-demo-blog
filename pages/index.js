import Head from 'next/head';
import Post from '../components/Post';
import { gql, GraphQLClient } from 'graphql-request';
import { sortByDate } from '../utils/utils';
import React from 'react';

export async function getServerSideProps() {
  const url = `${process.env.ENDPOINT_BASE_URL}/graphql`;
  const graphQLClient = new GraphQLClient(url, {
    // headers: {
    //   Authorization: process.env.STRAPI_API_TOKEN
    // }
  });
  const postsQuery = gql`
    query {
      posts {
        data {
          id
          attributes {
            title
            slug
            excerpt
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
  const postsData = await graphQLClient.request(postsQuery); 
  const posts = postsData.posts.data;
  return {
    props: {
      // posts: posts.sort(sortByDate),
      posts,
    },
  }
}

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}


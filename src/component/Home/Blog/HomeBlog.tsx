import { Card, CardActions, CardContent, CardHeader, Container, Grid, Grid2, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../parts/SectionHeader'
import { homeApi } from '../../../api/homeApi';
import MainButton from '../../parts/MainButton';
import { Link } from 'react-router-dom';

export interface BlogType {
  data: Array<{
    id: number;
    title: string;
    short_content: string;
    imgs_url: {
      formats: {
        thumbnail: {
          url: string;
        };
      }
    },
    publishedAt: string;
    categories: Array<{
      name: string;
      slug: string;
    }
    >
  }>,
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}


const HomeBlog = () => {
  const [blogs, setBlogs] = useState<BlogType>();
  const commonHost = import.meta.env.VITE_COMMON_HOST

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await homeApi.getBlogs();
        const data = response.data;
        setBlogs(data);
      } catch (error) {
        console.log("Error fetching blogs: ", error)
      }
    }
    fetchBlogs();
  }, [])

  if (!blogs) return (<Container maxWidth="xl" className="my-10 mx-auto px-4">
    <Grid2 container spacing={2}>
      {
        Array.from(new Array(3)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} className="group cursor-pointer !min-h-full">
            <Card className="overflow-hidden shadow-md flex flex-col h-full">
              <Skeleton variant="rectangular" width="100%" height={200} className="w-full" />
              <div className="flex flex-col items-center justify-between flex-grow">
                <CardHeader
                  title={<Skeleton width="80%" />}
                  className="text-center"
                />
                <CardContent className="text-center">
                  <Skeleton width="60%" />
                  <Skeleton width="90%" />
                </CardContent>
                <CardActions className="mt-4 flex justify-center w-full">
                  <Skeleton variant="rectangular" width="100px" height={36} />
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))
      }
    </Grid2>
  </Container>)

  return (
    <Container maxWidth="xl" className='my-10 px-4'>
      <SectionHeader title='Our Latest Blog' />
      <Grid container spacing={5}>
        {blogs.data.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id} className="group cursor-pointer !min-h-full">
            <div className="overflow-hidden shadow-md flex flex-col h-full">
              {/* Thumbnail with hover effect */}
              {blog.imgs_url && blog.imgs_url[0] && (
                <img
                  src={`${commonHost}${blog.imgs_url[0].formats.small.url}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover  transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                />
              )}

              {/* Blog content */}
              <div className='flex flex-col items-center justify-between flex-grow'>
                <div className="mt-4 px-4">
                  <h3 className="text-xl font-semibold group-hover:decoration-yellow-500 group-hover:underline">{blog.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(blog.publishedAt).toLocaleDateString()}</p>
                  <p className="mt-2 text-gray-700 ">{blog.short_content}</p>
                </div>

                {/* Align buttons at the bottom */}
                <div className="mt-4 p-3">
                  <Link to={`/blog/${blog.documentId}`}>
                    <MainButton title='Read More' />
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>

  );
}

export default HomeBlog
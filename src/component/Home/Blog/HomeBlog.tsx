import { Card, CardActions, CardContent, CardHeader, Container, Grid, Grid2, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../parts/SectionHeader'
import { homeApi } from '../../../api/homeApi';
import MainButton from '../../parts/MainButton';

interface BlogType {
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
  }>
}


const HomeBlog = () => {
  const [blogs, setBlogs] = useState<BlogType>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await homeApi.getBlogs();
        const data = response.data;
        setBlogs(data);
        console.log(data)
      } catch (error) {
        console.log("Error fetching blogs: ", error)
      }
    }
    fetchBlogs();
  }, [])

  if (!blogs) return (<Container maxWidth="lg" className="my-10 !p-0">
    <Grid2 container spacing={5}>
      {
        Array.from(new Array(6)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} className="group cursor-pointer !min-h-full">
            <Card className="overflow-hidden shadow-md rounded-lg flex flex-col h-full">
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
    <Container maxWidth='lg' className='my-10 !p-0'>
      <SectionHeader title='Our Latest Blog' />
      <Grid container spacing={5}>
        {blogs.data.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id} className="group cursor-pointer !min-h-full">
            <div className="overflow-hidden shadow-md rounded-lg flex flex-col h-full">
              {/* Thumbnail with hover effect */}
              {blog.imgs_url && blog.imgs_url[0] && (
                <img
                  src={`http://localhost:1337${blog.imgs_url[0].formats.small.url}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded--t-lg transition-transform duration-300 group-hover:scale-105 group-hover:rounded-t-lg group-hover:shadow-lg"
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
                  <MainButton title='Read More' />
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
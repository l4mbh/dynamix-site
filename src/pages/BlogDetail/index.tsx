/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostsApi } from '../../api/getPostsApi';
import { Card, CardContent, Typography, CardMedia, Container } from "@mui/material";
import Slider from "react-slick";
import { motion } from 'framer-motion';
import SectionHeader from '../../component/parts/SectionHeader';
import PageHeader from '../../component/parts/PageHeader';
import Loading from '../../component/parts/Loading';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  documentId: string;
  title: string;
  short_content: string;
  published_date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blog_content: string;
  imgs_url: Array<{
    url: string;
  }>;
}

const index = () => {
  const [post, setPost] = useState<Post>();
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Hiển thị 3 bài
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Màn hình nhỏ hơn 600px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {

    // Lấy phần tử bằng id
    const anchorElement = document.getElementById('blog');
    if (anchorElement) {
      // Cuộn đến phần tử
      anchorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const fetchPost = async () => {
      try {
        const response = await getPostsApi.getPost(id);
        const data = response.data;
        setPost(data.data);
        fetchRelatedBlogs(data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchRelatedBlogs = async (currentBlog: any) => {
      try {
        if (currentBlog.categories.length > 0) {
          const categoryId = currentBlog.categories[0].slug; // Sử dụng danh mục đầu tiên
          const response = await getPostsApi.getRelatedBlogs(categoryId, currentBlog.documentId); // Fetch bài liên quan
          setRelatedBlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>
    <PageHeader title="Loading..." />
    <Container maxWidth="xl" className='!w-full !min-h-screen flex items-center justify-center'>
      <Loading />
    </Container>
  </div>

  return (
    <>
      <PageHeader title={post.title} />
      <div className="max-w-5xl mx-auto my-8 px-4" >
        <Card className="shadow-lg !rounded-none">
          <CardMedia
            component="img"
            height="400"
            image={`${commonHost}${post.imgs_url[0].url}`}
            alt="Solar Energy"
            className="object-fit object-center max-h-[400px]"
            id='blog'
          />
          <CardContent>
            <div className="mb-[50px]">
              <SectionHeader title={post.title} align="center" />
              <Typography
                variant="subtitle1"
                className="text-gray-500 mb-4 p-2  text-center"
              >
                Published on <span className="font-semibold">{new Date(post.published_date).toDateString()}</span>
              </Typography>
            </div>
            <Typography
              variant="body1"
              className="mb-4 leading-relaxed  p-2"
              dangerouslySetInnerHTML={{ __html: post.blog_content }}
            ></Typography>
          </CardContent>
        </Card>
        {/* Related Blogs Section */}
        <div>
          <h2 className='text-2xl uppercase tracking-widest mt-5 font-bold mb-4'>Related Blogs :</h2>
          <Slider {...settings}>
            {relatedBlogs.length > 0 ? (
              relatedBlogs.map((relatedBlog: any) => (
                <motion.div
                  key={relatedBlog.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="px-4"
                >
                  <Link to={`/blog/${relatedBlog.documentId}`}>
                    <div className="shadow-md overflow-hidden group hover:cursor-pointer">
                      <img
                        src={relatedBlog.imgs_url?.[0]?.formats?.small?.url
                          ? `http://localhost:1337${relatedBlog.imgs_url[0].formats.small.url}`
                          : '/placeholder.jpg'}
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-yellow-primary">{relatedBlog.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{relatedBlog.short_content}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p>No related blogs found.</p>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default index
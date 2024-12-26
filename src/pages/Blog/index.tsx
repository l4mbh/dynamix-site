/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import PageHeader from '../../component/parts/PageHeader';
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { BlogType } from '../../component/Home/Blog/HomeBlog';
import { Link } from 'react-router-dom';
import { getPostsApi } from '../../api/getPostsApi';
import Loading from '../../component/parts/Loading';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface categoryType {
  blogs: any;
  slug: string;
  name: string;
  id: string;
}

interface categoriesType {
  data: categoryType[];
}


const Index = () => {
  const [blogs, setBlogs] = useState<BlogType[] | null>(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<categoriesType>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const commonHost = import.meta.env.VITE_COMMON_HOST

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Đặt lại trang khi thay đổi danh mục
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory === 'all') {
          response = await getPostsApi.getPosts(page, 3);
        } else {
          response = await getPostsApi.getPostsByCategory(selectedCategory, page, 3);
        }
        const data = response.data;
        setBlogs(data.data);
        setTotalPages(data.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getPostsApi.getCategories();
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
    fetchBlogs();
  }, [page, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading || !blogs || !categories) return (
    <>
      <PageHeader title='About us' />
      <Container maxWidth="xl" className='!w-full p-5 !min-h-screen flex items-center justify-center relative'>
        <Loading />
      </Container></>
  )

  return (
    <div>
      <PageHeader title="Blog" />
      <Container maxWidth="xl" className="py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="col-span-1">
            <div className="flex flex-col gap-6">
              <span className="text-3xl tracking-widest font-semibold mb-4 uppercase">Categories</span>
              <ul className='flex flex-col gap-6'>
                <li
                  className={`text-sm font-normal hover:text-yellow-primary transition-colors duration-300 cursor-pointer ${selectedCategory === 'all' ? 'text-yellow-primary' : 'text-secondary-text'}`}
                  onClick={() => handleChangeCategory('all')}
                >
                  All
                </li>
                {categories.data.map((category) => (
                  <li
                    key={category.slug}
                    className={`text-md font-light hover:text-yellow-primary transition-colors duration-300 cursor-pointer ${selectedCategory === category.slug ? 'text-yellow-primary' : 'text-secondary-text'}`}
                    onClick={() => handleChangeCategory(category.slug)}
                  >
                    {category.name}
                    {category.blogs.length > 0 ? ` (${category.blogs.length})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <span className="text-3xl tracking-widest font-semibold mb-4 uppercase lg:p-4">Posts</span>
            {
              blogs.length > 0 ? (
                <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5 mt-5 lg:p-4">
                  {blogs.map((post) => (
                    <Link key={post.id} to={`/blog/${post.documentId}`}>
                      <Card
                        className="flex flex-row cursor-pointer group max-h-[200px] transition-shadow duration-300 !rounded-none"
                        sx={{ maxWidth: '100%' }}
                      >
                        <CardMedia
                          component="img"
                          className="!w-1/3 object-cover"
                          image={
                            post.imgs_url?.[0]?.formats?.small?.url
                              ? `${commonHost}${post.imgs_url[0].formats.small.url}`
                              : '/placeholder.jpg'
                          }
                          alt={post.title || 'No title available'}
                        />
                        <CardContent className="flex flex-col justify-between p-4 w-2/3">
                          <Typography
                            component="div"
                            title={post.title}
                            className="line-clamp-2 tracking-widest !text-2xl !font-bold uppercase group-hover:text-yellow-primary transition-colors duration-300 m-0 p-0"
                          >
                            {post.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" className="mt-2">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="text.primary" className="mt-4 line-clamp-2">
                            {post.short_content}
                          </Typography>
                          <div className="flex items-center">
                            {post.categories.map((category: categoryType) => (
                              <span key={category.id} className="mt-4 w-fit text-xs text-secondary-text mx-2">
                                {category.name}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span className="text-2xl font-semibold">No posts found</span>
                </div>
              )
            }

            <div className="flex flex-col items-center justify-end mt-6 ">
              <div className='flex items-center'>
                <button disabled={page === 1} className='disabled:text-gray-400 flex items-center justify-center text-black bg-gray-bg h-10 w-10 cursor-pointer' onClick={() => handlePageChange(page - 1)}>
                  <KeyboardDoubleArrowLeftIcon className='!text-xs' />
                </button>
                <span className=" text-white bg-black h-10 w-10 flex items-center justify-center">{`${page}`}</span>
                <button className='disabled:text-gray-400 flex items-center justify-center text-black bg-gray-bg h-10 w-10 cursor-pointer' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                  <KeyboardDoubleArrowRightIcon className='!text-xs' />
                </button>
              </div>
              <div>
                <span className="text-secondary-text h-10 w-full flex items-center justify-center">
                  Page {page} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;

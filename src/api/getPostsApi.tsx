/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInstance"

export const getPostsApi = {
  getPosts: (page: number, limit: number) => {
    return axiosInstance.get(`/blogs?populate=categories&populate=imgs_url&pagination[page]=${page}&pagination[pageSize]=${limit}`)
  },
  getPost: (id: any) => {
    return axiosInstance.get(`/blogs/${id}?populate=categories&populate=imgs_url`)
  },
  getCategories: () => {
    return axiosInstance.get('/categories?populate=blogs')
  },
  getPostsByCategory: (slug: any, page: number, limit: number) => {
    return axiosInstance.get(`/blogs?filters[categories][slug][$eq]=${slug}&populate=imgs_url&populate=categories&pagination[page]=${page}&pagination[pageSize]=${limit}`)
  },
  getRelatedBlogs : (categoryId: any, currentBlogId: any) => {
    return axiosInstance.get(`/blogs?filters[categories][slug][$eq]=${categoryId}&filters[documentId][$ne]=${currentBlogId}&populate=imgs_url&populate=categories`)
  },
}
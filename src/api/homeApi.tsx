import axios from "axios";
import axiosInstance from "./axiosInstance";

export const homeApi = {
  getServices: () => axiosInstance.get('/home-services?populate=img_url'),
  getHeroInfo: () => axiosInstance.get('/home-heroes?populate=img_url'),
  getProvidingServices: () => axiosInstance.get('/home-providing-services?populate=img_url'),
  getProjects: () => axiosInstance.get('/home-projects?populate=imgs_url'),
  getCustomersInfo: () => axiosInstance.get('/home-customers?populate=img_url'),
  getBlogs: () => axiosInstance.get('/blogs?populate=imgs_url&thumbnail'),
  getBoutInfo: () => axiosInstance.get('/home-about?populate=img_url'),
}
import axiosInstance from "./axiosInstance";

export const servicesApi = {
  getServices: () => axiosInstance.get('/services-services?populate=img_url'),
}
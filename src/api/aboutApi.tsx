import axiosInstance from "./axiosInstance";

export const aboutApi = {
  getAbout: () => axiosInstance.get('/about-about?populate=img_url'),
  getCerts: () => axiosInstance.get('/about-certs?populate=img_url'),
  getTeams: () => axiosInstance.get('/about-teams?populate=mem_img'),
  getVision: () => axiosInstance.get('/about-vision?populate=img_url')
}
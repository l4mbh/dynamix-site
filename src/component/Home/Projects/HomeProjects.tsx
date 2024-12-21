import React, { useEffect, useState } from 'react'
import Carousel from '../../parts/Carousel'
import { Container } from '@mui/material'
import SliderComponent from '../../parts/SliderComponent'
import SectionHeader from '../../parts/SectionHeader'
import { homeApi } from '../../../api/homeApi'
import Loading from '../../parts/Loading'

export type ProjectType = {
  data: Array<{
    id: number;
    title: string;
    description: string;
    imgs_url: {
      url: string;
    };
  }>;
};

const HomeProjects = () => {
  const [projects, setProjects] = useState<ProjectType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getProjects();
        setProjects(response.data)
      } catch (error) {
        console.log("ERrror fetching ProvingServices: ", error)
      }
    };

    fetchData();
  }, [])

  if (!projects) return <Container maxWidth="xl" className='!w-full !min-h-full flex items-center justify-center relative'><Loading /></Container>


  return (
    <Container maxWidth="xl" className='my-10 !mx-auto px-4'>
        <SectionHeader title='Our Proud Achievements' subtitle='The results of our hard work' />
        <SliderComponent projects={projects} />
    </Container>
  )
}

export default HomeProjects
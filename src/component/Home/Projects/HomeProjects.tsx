import React, { useEffect, useState } from 'react'
import Carousel from '../../parts/Carousel'
import { Container } from '@mui/material'
import SliderComponent from '../../parts/SliderComponent'
import SectionHeader from '../../parts/SectionHeader'
import { homeApi } from '../../../api/homeApi'

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

  if (!projects) return <p>Loading ...</p>


  return (
    <Container maxWidth='lg' className='my-10 !p-0'>
        <SectionHeader title='Our Proud Achievements' />
        <SliderComponent projects={projects} />
    </Container>
  )
}

export default HomeProjects
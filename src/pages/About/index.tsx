/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import PageHeader from '../../component/parts/PageHeader'
import PageLayout from '../../layout/PageLayout'
import { aboutApi } from '../../api/aboutApi'
import { Container } from '@mui/material'
import SectionHeader from '../../component/parts/SectionHeader'
import Loading from '../../component/parts/Loading'

const index = () => {
  const [about, setAbout] = useState<any>(null);
  const [vision, setVision] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [certifications, setCertifications] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const [aboutRes, visionRes, teamRes, certificationsRes] = await Promise.all([
          aboutApi.getAbout(),
          aboutApi.getVision(),
          aboutApi.getTeams(),
          aboutApi.getCerts(),
        ]);

        setAbout(aboutRes.data);
        setVision(visionRes.data);
        setTeam(teamRes.data);
        setCertifications(certificationsRes.data);
      } catch (err) {
        setError('Error fetching data');
        console.log('Error fetching about: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return <PageLayout>
      <PageHeader title='About us' />
      <Container className='!w-full p-5 !min-h-full flex items-center justify-center relative'>
        <Loading />
      </Container>
    </PageLayout>
  }

  if (error) {
    return <PageLayout>
    <PageHeader title='About us' />
    <Container maxWidth="xl" className='!w-full p-5 !min-h-full flex flex-col items-center justify-center relative'>
      <Loading />
      {error}
    </Container>
  </PageLayout>
  }

  return (
    <>
      <PageHeader title='About us' />

      <Container maxWidth="xl">
        <div className="flex mt-[100px]">
          <div className="w-1/2 ">
            <img
              src={`${commonHost}${about.data.img_url.url}`}
              alt="Sample Image"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-1/2 px-4">
            <SectionHeader title='Who we are' />
            <div
              className="prose text-justify"
              dangerouslySetInnerHTML={{ __html: about.data.description }}
            />
          </div>
        </div>
      </Container>

      <div className="flex items-center bg-fixed my-[100px] !h-[500px]" style={{ backgroundImage: `url(${`${commonHost}${vision.data.img_url.url}`})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="w-full h-full flex items-center py-[40px] bg-black bg-opacity-70">
          <Container>
            <SectionHeader title='Our Vision' theme='dark' align='center' />
            <div
              className="prose text-white text-center"
              dangerouslySetInnerHTML={{ __html: vision.data.description }}
            />
          </Container>
        </div>
      </div>

      <Container>
        <div className="space-y-6 mt-5">
          <SectionHeader title='Meet our team' />
          {team.data.map((member: any, index: any) => (
            <div key={index} className="flex items-center space-x-4 border border-gray-300 p-4 transition-all duration-200 hover:shadow-md">
              {/* Bên trái: Ảnh */}
              <div className="w-2/5">
                <img
                  src={`${commonHost}${member.mem_img.url}`}
                  alt={member.mem_name}
                  className="w-[175px] h-auto object-cover rounded-none"
                />
              </div>
              {/* Bên phải: Nội dung */}
              <div className="w-3/5">
                <h3 className="text-xl font-semibold">{member.mem_name}</h3>
                <p className="text-lg text-gray-500">{member.mem_role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className='mt-[150px]'>
        <SectionHeader title='Certifications' />
        <div className="flex space-x-8 overflow-x-auto py-4 mb-5">
          {certifications.data.map((cert: any, index: any) => (
            <div key={index} className="flex flex-col items-center rounded-lg">
              {/* Hình ảnh chứng chỉ */}
              <img
                src={`${commonHost}${cert.img_url.url}`}
                alt={cert.title}
                className="w-52 h-68 rouned-lg object-cover mb-2 rounded-none hover:shadow-lg hover:scale-110 transition-all duration-200"
              />
              {/* Tiêu đề chứng chỉ */}
              <p className="text-center text-xl font-medium">{cert.title}</p>
            </div>
          ))}
        </div>
      </Container>

    </>
  )
}

export default index
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import PageHeader from '../../component/parts/PageHeader'
import PageLayout from '../../layout/PageLayout'
import { aboutApi } from '../../api/aboutApi'

const index = () => {
  const [about, setAbout] = useState<any>(null);
  const [vision, setVision] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [certifications, setCertifications] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageLayout>
      <PageHeader title='About us' />

      <div className="flex mt-[100px]">
        <div className="w-1/2">
          <img
            src={`http://localhost:1337${about.data.img_url.url}`}
            alt="Sample Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-4">
          <p className='text-3xl font-bold uppercase text-yellow-500 text-center my-5'>Who are we?</p>
          <div
            className="prose text-justify"
            dangerouslySetInnerHTML={{ __html: about.data.description }}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse items-center">
        <div className="w-1/2">
          <img
            src={`http://localhost:1337${vision.data.img_url.url}`}
            alt="Sample Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-4">
          <p className='text-3xl font-bold uppercase text-yellow-500 text-center my-5'>Our vision</p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: vision.data.description }}
          />
        </div>
      </div>

      <div className="space-y-6 mt-5">
        <p className='text-3xl font-bold uppercase text-yellow-500 text-center my-5'>our foudation team</p>
        {team.data.map((member, index) => (
          <div key={index} className="flex items-center space-x-4 border border-gray-300 p-4 transition-all duration-200 hover:shadow-md">
            {/* Bên trái: Ảnh */}
            <div className="w-2/5">
              <img
                src={`http://localhost:1337${member.mem_img.url}`}
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

      <p className='text-3xl font-bold uppercase text-yellow-500 text-center my-5 mt-[50px]'>our certifications</p>
      <div className="flex space-x-8 overflow-x-auto py-4 mb-5">
      {certifications.data.map((cert, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Hình ảnh chứng chỉ */}
          <img
            src={`http://localhost:1337${cert.img_url.url}`}
            alt={cert.title}
            className="w-52 h-68 object-cover mb-2 rounded-none hover:shadow-lg hover:scale-110 transition-all duration-200"
          />
          {/* Tiêu đề chứng chỉ */}
          <p className="text-center text-xl font-medium">{cert.title}</p>
        </div>
      ))}
    </div>

    </PageLayout>
  )
}

export default index
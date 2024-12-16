import { Container, Grid2 } from "@mui/material";
import { use } from "motion/react-client";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import { homeApi } from "../../../api/homeApi";
import SectionHeader from "../../parts/SectionHeader";
import { Star } from "@mui/icons-material";

interface Customers {
  id: number;
  customer_name: string;
  customer_comments: string;
  img_url: {
    url: string;
  };
}

const HomeCustomer: React.FC = () => {
  // State để theo dõi thẻ đang được chọn
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [customers, setCustomers] = useState<Customers[]>([]);

  useEffect(() => {
    homeApi
      .getCustomersInfo()
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Cấu hình slider
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    initialSlide: 1,
    focusOnSelect: true, // Đảm bảo card ở giữa được chọn
    beforeChange: (current: number, next: number) => {
      setSelectedIndex(next); // Cập nhật selectedIndex khi thay đổi slide
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Grid2 className="bg-gray-100 py-8 w-full">
      <Container>
        <SectionHeader title="Testimonials" align="center" />
        <Slider {...settings}>
          {customers.map((testimonial, index) => (
            <div key={testimonial.id} className="p-4">
              <div
                className={`transition-all transform ${selectedIndex === index
                  ? "scale-110" // Tăng kích thước cho card được chọn
                  : "scale-90" // Giảm kích thước cho card bên ngoài
                  } bg-white rounded-lg shadow-lg p-6 text-center hover:scale-101 hover:shadow-xl`}
              >
                <img
                  src={`http://localhost:1337${testimonial.img_url.url}`}
                  alt={testimonial.customer_name}
                  className="w-20 h-20 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonial.customer_name}
                </h3>
                <p className="text-sm text-gray-500">CEO</p>
                <div className="!text-yellow-400 !text-xs">
                  <Star/>
                  <Star/>
                  <Star/>
                  <Star/>
                  <Star/>
                </div>

                {selectedIndex === index && ( // Hiển thị nội dung comment chỉ cho card được chọn
                  <blockquote className="italic text-gray-600 mt-4">
                    "{testimonial.customer_comments}"
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </Grid2>
  );
};

export default HomeCustomer
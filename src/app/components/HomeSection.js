"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function HomeSection() {
  const images = [
    "/home-slider/slider2.jpg",
    "/home-slider/slider1.jpg",
    "/home-slider/slider3.jpg",
    "/home-slider/slider4.jpg",
    "/home-slider/slider5.jpg",
    "/home-slider/slider6.jpg",
    "/home-slider/slider7.jpg",
    "/home-slider/slider8.jpg",
    "/home-slider/slider9.jpg",
    "/home-slider/slider10.jpg",
    "/home-slider/slider11.jpg",
    "/home-slider/slider12.jpg",
    "/home-slider/slider13.jpg",
  ];

  return (
    <section id="home" className="section bg-yellow-p1">
      <div className="max-w-full space-y-2 pt-30 pb-12">
        <div className="flex flex-col sm:flex-row sm:text-left sm:items-left items-center sm:justify-left pb-6">
          <div>
            <Image
              src="/logo/logo-som.png"
              alt="united tu mascot"
              width={200}
              height={200}
            />
          </div>
          <div className="pt-10">
            <p className="motto">
              "คิดด้วยกัน ธรรมด้วยกัน<br></br>เปลี่ยนธรรมศาสตร์ไปด้วยกัน"
            </p>
            <h1 className="text-gradient">พรรคธรรมด้วยกัน</h1>
          </div>
        </div>

        <div className="max-w-7xl px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-[3/2]">
                  <Image src={src} alt={`Slide ${index + 1}`} fill />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

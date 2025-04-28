import Image from "next/image";
import { PhoneCall } from "lucide-react";

const images = [
  {
    src: "/contact/contact1.png",
    name: "Instagram",
    href: "https://www.instagram.com/unitedtu.party?igsh=MXl4eG1kenFoYW14",
  },
  {
    src: "/contact/contact2.png",
    name: "Facebook",
    href: "https://www.facebook.com/share/16GgV7EJdZ/?mibextid=wwXIfr",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section bg-zinc-100">
      <div className="max-w-7xl px-4 py-12">
        <div className="mb-4">
          <p>มีคำถามเพิ่มเติม ?</p>
          <div className="section-title mb-6">
            <h2 className="text-gradient">ติดต่อเรา</h2>
            <PhoneCall size={42} />
          </div>
          <p className="font-bold">
            ต้องการติดตามข่าวสารต่าง ๆ สามารถติดตามเราได้ผ่านช่องทางด้านล่าง
            หรือหากต้องการแจ้งปัญหาที่พบภายในมหาวิทยาลัยเรายินดีช่วยเหลือเพื่อนนักศึกษาทุกคน
            ติดต่อเราได้เลย
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl max-w-4xl"
            >
              {/*//?หาความหมายของ rel*/}
              <a href={image.href} target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <p className="text-white font-bold">{image.name}</p>
                </div>
                <Image
                  key={image.id}
                  src={image.src}
                  alt={`${image.name} united tu party`}
                  width={1200}
                  height={600}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

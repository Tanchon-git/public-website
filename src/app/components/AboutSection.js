import Image from "next/image";
import { UserRoundSearch } from "lucide-react";

//FIXME: เปลี่ยน src รูปแล้วก็ hiperlink
const images = [
  {
    src: "/about/about.jpg",
    title: "ความเป็นมาของพรรค",
    href: "https://www.instagram.com/unitedtu.party?igsh=MXl4eG1kenFoYW14",
  },
  {
    src: "/about/about.jpg",
    title: "สมาชิกพรรค",
    href: "https://www.instagram.com/unitedtu.party?igsh=MXl4eG1kenFoYW14",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section bg-gd">
      <div className="max-w-7xl px-4 py-12">
        <div className="section-title">
          <h2 className="text-white text-shadow-md/50">เกี่ยวกับเรา</h2>
          <UserRoundSearch size={42} className="text-white" />
        </div>

        <div className="flex flex-col gap-4 my-8">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl">
              <a href={image.href} target="_blank">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <h2 className="text-white">{image.title}</h2>
                </div>
                <Image
                  key={image.id}
                  src={image.src}
                  alt={`${image.title} united tu party`}
                  width={1200}
                  height={1200}
                />
              </a>
            </div>
          ))}
        </div>
        {/*TODO: edit hyperlink*/}
        <a
          target="_blank"
          href="https://www.instagram.com/unitedtu.party?igsh=MXl4eG1kenFoYW14"
          className="text-primary text-2xl font-bold p-3 bg-white rounded-2xl shadow-md/50"
        >
          ร่วมเป็น Supporter พรรคธรรมด้วยกัน
        </a>
      </div>
    </section>
  );
}

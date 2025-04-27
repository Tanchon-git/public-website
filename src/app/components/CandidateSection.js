import Image from "next/image";

export default function CandidateSection() {
  const images = [
    {
      name: "เอเชีย นิรัชพร พรหมบัณฑูร",
      src: "/candidate/candidate1.png",
      position: "อุปนายกฯ ศูนย์รังสิต",
    },
    {
      name: "เอ๋ อพิชญา วิทยากุล",
      src: "/candidate/candidate2.png",
      position: "นายกองค์การนักศึกษา",
    },
    {
      name: "นาตา ณาริตา ก้อนทอง",
      src: "/candidate/candidate3.png",
      position: "อุปนายกฯ ศูนย์ลำปาง",
    },
  ];

  return (
    <section id="candidate" className="section bg-gd">
      <div className="max-w-7xl px-4 py-12 gap-6 space-y-6 sm:space-y-0 sm:flex">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={`${image.name}`}
              width={600}
              height={600}
              className="rounded-2xl"
            />
            <div className="pt-4">
              <h3 className="text-white text-shadow-white text-shadow-md/50">
                {image.name}
              </h3>
              <p className="text-white">ผู้ลงสมัครตำแหน่ง</p>
              <p className="text-2xl/4 text-white">{image.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

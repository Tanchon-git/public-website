import React, { useState, useRef, useEffect } from "react";
import { ScrollText, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const policies = [
  {
    mission: "อมธ. ของเธอ",
    section: [
      "อมธ. All in 1",
      "ออมบุดสแมน (Ombudsman)",
      "ธรรมศาสตร์และการเมือง",
      "ธรรมศาสตร์มาร์เก็ตเพลส",
      "แก้ระบบยืม-คืนเงินสําหรับจัดโครงการ",
      "สหภาพคนหอนอก",
      "TUSU Red Alert แจ้งเหตุฉุกเฉิน",
    ],
  },
  {
    mission: "สิทธิ",
    section: [
      "Free Speech Area",
      "นักศึกษามีสิทธิเลือกอธิการบดี",
      "6 ตุลา เป็นวันหยุด",
      "วันอีดิ้ลอัฎฮา ชาวมุสลิมต้องลาได้โดยไม่นับเป็นวันลา",
      "Case Manager ประสานงานที่เกี่ยวข้องกับความปลอดภัยทางเพศ",
    ],
  },
  {
    mission: "สวัสดิการ",
    section: [
      "Tinder Gold Free",
      "บัตรนักศึกษา ใบเดียว ทําได้ทุกอย่าง",
      "ข้าวรสบ้าน 4 ภาค ใกล้ฉัน (รังสิต)",
      "ในมอ EV ต้องมีเพิ่ม (รังสิต) + สานต่อ EV รอบดึกช่วงสอบ",
      "นอกมอ EV ต้องไปถึง (รังสิต)",
      "ฝนตกต้องไม่เปียก ร่มยืมคืนต้องไม่มีแค่หอใน",
      "เพิ่มร้านอาหารฮาลาลในมหาลัย",
      "เพิ่มห้องละมาด ศูนย์ลําปาง (ลําปาง)",
      "เพิ่มป้ายจอดรถเมล์ในมอ และที่รอรถเมล์เชียงราก 1 (รังสิต)",
      "ห้องสมุดนงเยาว์เพื่อชาวคณะสุขภาพ (รังสิต)",
      "เพิ่มที่จอดรถโซนปิยชาติ สําหรับนักศึกษา (รังสิต)",
      "เครื่องซักผ้าแสกนจ่ายหอใน (รังสิต, ลําปาง)",
      "เพิ่มสิทธิประโยชน์สําหรับนักศึกษา (อาหาร เครื่องดื่ม ความบันเทิง การเดินทาง หมอดู)",
      "“คูปองทําด้วยกัน” ตัวช่วยลดค่าใช้จ่ายนักศึกษา ร้านค้ารายย่อย รอบมอ",
      "TU Shuttle Bus ศูนย์รังสิต ไป สนามบิน รถไฟฟ้า ช่วงเทศกาล (รังสิต)",
      "TUCEEC Matching คนหางาน",
      "Charging Station ชาร์จโทรศัพท์ ไอแพด ฟรี ทั่วมอ",
      "Refill Shop รีฟิลของใช้",
      "แจกแก้ว ตั้งแต่แรกพบ",
      "ร้านอาหารสวัสดิการ",
      "พื้นที่ระบายอารมณ์ เครียด โกรธ เหนื่อย",
      "MuvMi เพื่อชาวท่าพระจันทร์ (ท่าพระจันทร์)",
      "พื้นที่อ่านหนังสือ 24 ชม. (ลําปาง)",
      "เพิ่มความบันเทิงหน้ามอ ศูนย์ลําปาง (ลําปาง) เพิ่มร้านอาหาร",
      "แอพฯติดตามรถศูนย์ลําปาง (ลําปาง)",
      "จักรยานต้องใช้ได้ รถรางไฟฟ้าต้องเร็วขึ้น (ลําปาง)",
    ],
  },
  {
    mission: "ความปลอดภัย",
    section: [
      "น้ําดื่มสะอาดทุกที่",
      "คีย์การ์ดหอใน",
      "QR Code ร้องเรียนคนขับ ต้องมีทุกคัน",
      "ทางเดินเท้าปลอดภัยสําหรับเพื่อนพิการ ทางเท้าสําหรับทุกคน",
      "ทางจักรยานครอบคลุม ปลอดภัย",
      "ไฟสว่างตามมาตรฐาน ทั่วมอ",
      "ปรับปรุงระบบระบายน้ํา ลดน้ําท่วมขัง",
      "เพิ่ม Emergency Pole",
      "เสียงตามสายทั่วมอ และรอบมอ",
      "เพิ่มเบี้ยประกันอุบัติเหตุนักศึกษา",
    ],
  },
  {
    mission: "สุขภาพ",
    section: [
      "ตู้กาชาปองผ้าอนามัยฟรี",
      "ตู้กดถุงยาง-ชุดตรวจ HIV ฟรี ผ่านตู้กดเครื่องดื่ม",
      "Well Being ต้องมีหมอ-telemedicine",
      "ระบบส่งต่อเคสสุขภาพจิตต้องยึดนักศึกษาเป็นศูนย์กลาง",
      "วันหยุดสุขภาพจิต",
      "ติดตั้งระบบฟอกอากาศกับเครื่องปรับอากาศทั่วมอ (ทุกศูนย์)",
    ],
  },
  {
    mission: "เทคโนโลยี",
    section: [
      "Trash Lucky @TU ช่วยโลก ลุ้นโชค",
      "เว็บอมธ. Mega Web",
      "พัฒนา TU Great App",
    ],
  },
  {
    mission: "ชุมนุม กลุ่มกิจกรรม",
    section: [
      "แก้ไขไทม์ไลน์ปฏิทินกิจกรรมนักศึกษา",
      "เพิ่มเงินอุดหนุนชุมนุมกีฬา เพิ่มเงินสนับสนุนอุปกรณ์กีฬา",
      "พื้นที่ประชาสัมพันธ์กิจกรรมเป็นระเบียบ",
      "Transcript กิจกรรม",
      "เพิ่มประสิทธิภาพคลังทรัพยากรกลางของกลุ่มกิจกรรม",
      "Summer Sport Camp โดยนักกีฬามหาลัย",
      "เปลี่ยนที่รกร้างเป็นพื้นที่กิจกรรม",
      "ส่งเสริมกิจกรรมและประชาสัมพันธ์ ร่วมกับชุมนุม กลุ่มอิสระ",
      "เพิ่มพื้นที่กิจกรรม ชุมนุม (ลําปาง)",
    ],
  },
  {
    mission: "วิชาการ",
    section: [
      "คะแนนต้องออกก่อนถอน W",
      "เวลาเรียนเหลื่อมกัน",
      "วีซ่าเชงเก้นห้องสมุด ใช้บัตรนักศึกษาใบเดียว",
      "Chat GPT Plus",
      "LearnEverywhere อัดคลิปเลคเชอร์ เรียนไฮบริดได้ทุกที่",
      "“TU Smart” ด้วยวิชา TU Impact",
      "ขยายเวลาห้องอ่านหนังสือ ศูนย์ลําปาง (ลําปาง)",
    ],
  },
  {
    mission: "อีเวนต์",
    section: [
      "กิจกรรมประจําถิ่น 4 ศูนย์(โดย อมธ กลาง)",
      "ทํา Book Fair และ Open House ด้วยกัน (รังสิต)",
      "“Eco Swap Market” ตลาดนัดแลกพบ (รังสิต)",
      "Hackathon เปลี่ยนธรรมศาสตร์ ด้วยคนธรรมศาสตร์",
      "Skill&Chill กิจกรรมเวิร์คชอปทุกเดือนสําหรับนักศึกษา (รังสิต)",
      "Thammasat Live Contest (รังสิต)",
      "ValenU (รังสิต)",
      "เทศกาลภาพยนตร์(รังสิต)",
      "ผลักดันให้แยกขยะถูกต้องทุกโครงการของ อมธ.",
      "Night Market ตลาดกลางคืน (ลําปาง)",
      "Workshop TOUR (ลําปาง)",
    ],
  },
];

export default function PolicySection() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current = policies.map(() => React.createRef());
  }, [policies]);

  return (
    <section id="policy" className="section bg-yellow-p1">
      <div className="max-w-7xl px-4 py-12">
        <div className="mb-8">
          <div className="section-title">
            <h2 className="text-gradient">นโยบายของเรา</h2>
            <ScrollText size={42} />
          </div>
          <h3 className="bg-gd p-1 rounded-2xl text-white">
            9 ภารกิจ 1 ความฝัน
          </h3>
        </div>

        <div className="mb-8">
          {policies.map(
            (
              policy,
              index //FIXME: Error animation in IOS
            ) => (
              <div key={index} className="mb-4">
                <h4
                  className={`p-3 italic cursor-pointer flex items-center justify-between transition-all duration-300  ${
                    openIndex === index
                      ? "text-white rounded-t-2xl bg-gd "
                      : "text-primary rounded-2xl bg-white shadow-md/50"
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>
                    ภารกิจที่ {index + 1} &quot;{policy.mission}&quot;
                  </span>
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </h4>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-3 bg-white rounded-b-2xl shadow-lg/50 overflow-hidden"
                    >
                      {policy.section.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-2xl text-left">
                          {itemIndex + 1}. {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
        </div>

        <div className="relative w-full rounded-4xl overflow-hidden flex flex-col items-center">
          <div className="absolute transform skew-y-[10deg] px-2 bg-primary/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-2rem] ml-[-7rem] sm:ml-[-8rem]">
            <h3 className="text-white">1 ความฝัน</h3>
          </div>
          <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-white text-shadow-lg/100 text-shadow-primary">
              &quot;Student Bar in Uni&quot;
            </h2>
          </div>
          <div className="w-full max-w-xl absolute p-2 bg-black/50 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[3.5rem] policy:mt-[4rem] sm:mt-[4.5rem]">
            <div className="text-white text-base/4 policy:text-xl/6 sm:text-2xl/6">
              เป้าหมายของการนําร่อง Student Bar in Uni คือ
              เพื่อลดอุบัติเหตุนอกมหาวิทยาลัยนําความเสี่ยงที่เลี่ยงไม่ได้ให้มาอยู่ในสภาพแวดล้อมที่ควบคุมได้
              และ ปลอดภัยกับชาวธรรมศาสตร์มากที่สุด
            </div>
          </div>
          <Image
            src="/policy/dream.jpg"
            alt="student bar"
            width={650}
            height={650}
          />
        </div>
      </div>
    </section>
  );
}

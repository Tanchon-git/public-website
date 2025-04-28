import { MessageCircleQuestion } from "lucide-react";

const lists = [
  {
    question: "Supporter คืออะไร",
    answer:
      "Supporter หรือ ผู้สนับสนุนพรรค คือ นักศึกษามหาวิทยาลัยธรรมศาสตร์ทุกคณะ ทุกชั้นปี ที่ชื่นชอบพรรคธรรมด้วยกัน",
  },
  {
    question: "Supporter ทำอะไรได้บ้าง",
    answer:
      "Supporter ของพรรคธรรมด้วยกันสามารถแสดงการสนับสนุนพรรคด้วยวิธีใดก็ได้ตามที่เห็นสมควร เช่น การแชร์โพสต์ของพรรคผ่านโซเชียลมีเดีย เป็นต้น",
  },
  {
    question: "ฉันจะเป็น Supporter ได้อย่างไร",
    answer:
      "การเป็น Supporter ทำได้ใน 1 คลิก ท่านสามารถคลิกเข้าร่วมกลุ่ม Supporter บน Instagram ได้เลย",
  },
  {
    question: "ทำไมชื่อพรรคธรรมด้วยกัน",
    answer:
      "ธรรมด้วยกันเริ่มจากแนวคิดการสร้างพรรคการเมืองบนฐานประชาธิปไตยแบบมีส่วนร่วม (Deliberative Democracy) ทั้งในด้านการระดมความคิด การทำงานเป็นทีม และการกำหนดเป้าหมายร่วมกัน คำว่า “ทำ” ยังพ้องเสียงกับ“ธรรม”ศาสตร์ ชื่อพรรคธรรมด้วยกันจึงสะท้อนถึงแนวคิด คิดด้วยกัน ธรรมด้วยกัน เปลี่ยนธรรมศาสตร์ไปด้วยกัน",
  },
];

export default function QuestionSection() {
  return (
    <section id="about" className="section bg-yellow-p1">
      <div className="max-w-7xl px-4 py-12">
        <div className="section-title">
          <h2 className="text-gradient">คำถามที่พบบ่อย</h2>
          <MessageCircleQuestion size={42} />
        </div>
        <div className="divide-y-1 divide-primary max-w-5xl">
          {lists.map((list, index) => (
            <div key={index} className="py-4">
              <h3>{list.question}</h3>
              <p className="italic">{list.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

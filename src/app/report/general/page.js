"use client";

import { useState } from "react";
import {
  MessageCircleWarning,
  Send,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

export default function Page() {
  const [form, setForm] = useState({
    title: "",
    detail: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState({ message: "", isOk: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!form.email.endsWith("@dome.tu.ac.th")) {
      setStatus({
        message: "กรุณากรอกอีเมล @dome.tu.ac.th เท่านั้น",
        isOk: false,
      });
      return;
    }

    if (form.phone.length !== 10) {
      setStatus({
        message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
        isOk: false,
      });
      return;
    }

    try {
      const res = await fetch("/api/report/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({
          message: "ส่งข้อมูลเรียบร้อยแล้ว ทางเราจะติดต่อกลับโดยเร็ว",
          isOk: true,
        });
        setForm({ title: "", detail: "", email: "", phone: "" });
      } else {
        setStatus({ message: "เกิดข้อผิดพลาดในการส่งข้อมูล", isOk: false });
      }
    } catch (error) {
      setStatus({
        message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        isOk: false,
      });
    }
  };

  return (
    <div>
      <section className="min-h-screen bg-white px-6 pt-30">
        <div className="max-w-2xl mx-auto">
          <div className="section-title mb-8">
            <h1 className="text-gradient">แจ้งปัญหาทั่วไป</h1>
            <MessageCircleWarning size={56} />
          </div>

          <form onSubmit={handleSubmit} className="report-form">
            <div>
              <label className="report-title">หัวข้อที่ต้องการร้องเรียน</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="report-input"
                placeholder="เช่น ปัญหาไฟฟ้าดับ อาคารเรียน..."
              />
            </div>

            <div>
              <label className="report-title">รายละเอียดเพิ่มเติม</label>
              <textarea
                name="detail"
                value={form.detail}
                onChange={handleChange}
                required
                rows="5"
                className="report-input resize-none"
                placeholder="อธิบายรายละเอียดปัญหาที่พบ"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="report-title">อีเมล (@dome.tu.ac.th)</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="report-input"
                  placeholder="example@dome.tu.ac.th"
                />
              </div>

              <div>
                <label className="report-title">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="report-input"
                  placeholder="08xxxxxxxx"
                />
              </div>
            </div>

            {status.message && (
              <p
                className={`report-status ${
                  status.isOk
                    ? "bg-green-200 text-green-600 border-green-600"
                    : "bg-red-200 text-red-600 border-red-600"
                }`}
              >
                {status.isOk ? (
                  <CircleCheckBig size={24} />
                ) : (
                  <CircleX size={24} />
                )}
                {status.message}
              </p>
            )}

            <div className="flex justify-center">
              <button type="submit" className="report-button">
                ส่งข้อมูล
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

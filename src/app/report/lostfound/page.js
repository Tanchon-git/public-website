"use client";

import { useState } from "react";
import { SearchCheck, Send, CircleCheckBig, CircleX } from "lucide-react";

export default function Page() {
  const [form, setForm] = useState({
    title: "ของฉันหาย",
    detail: "",
    email: "",
    phone: "",
  });

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState({ message: "", isOk: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
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

    if (images.length < 2) {
      setStatus({
        message: "กรุณาอัปโหลดรูปภาพอย่างน้อย 2 รูป",
        isOk: false,
      });
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("detail", form.detail);
    data.append("email", form.email);
    data.append("phone", form.phone);
    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await fetch("/api/report/lostfound", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus({
          message: "ส่งข้อมูลเรียบร้อยแล้ว ทางเราจะติดต่อกลับโดยเร็ว",
          isOk: true,
        });
        setForm({ title: "ของฉันหาย", detail: "", email: "", phone: "" });
        setImages([]);
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
            <h1 className="text-gradient">Lost & Found</h1>
            <SearchCheck size={56} />
          </div>

          <form onSubmit={handleSubmit} className="report-form">
            <div>
              <label className="report-title">หัวข้อที่ต้องการร้องเรียน</label>
              <select
                name="title"
                value={form.title}
                onChange={handleChange}
                className="report-input"
                required
              >
                <option value="ของฉันหาย">ของฉันหาย</option>
                <option value="ตามหาเจ้าของ">ตามหาเจ้าของ</option>
              </select>
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
                placeholder="อธิบายประเภท ลักษณะหรือตำหนิ"
              />
            </div>

            <div>
              <label className="report-title block mb-2">
                แนบรูปภาพสิ่งของ (อย่างน้อย 2 รูปในมุมที่แตกต่างกัน)
              </label>

              <div className="flex items-center space-x-4">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg shadow hover:bg-orange-400 transition"
                >
                  📷 เพิ่มรูปภาพ
                </label>
                <span className="text-gray-600">{images.length} รูป</span>
              </div>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
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

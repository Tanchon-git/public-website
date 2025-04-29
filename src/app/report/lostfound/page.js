"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    title: "ของฉันหาย",
    detail: "",
    email: "",
    phone: "",
  });

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(null);

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
      setStatus("กรุณากรอกอีเมล @dome.tu.ac.th เท่านั้น");
      return;
    }

    if (form.phone.length !== 10) {
      setStatus("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
      return;
    }

    if (images.length < 2) {
      setStatus("กรุณาอัปโหลดรูปภาพอย่างน้อย 2 รูป");
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
        setStatus("ส่งข้อมูลเรียบร้อยแล้ว ทางเราจะรีบติดต่อกลับโดยเร็ว");
        setForm({ title: "ของฉันหาย", detail: "", email: "", phone: "" });
        setImages([]);
      } else {
        setStatus("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    } catch (error) {
      setStatus("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div>
      <section className="min-h-screen bg-white px-6 pt-30">
        <div className="max-w-2xl mx-auto">
          <div className="section-title mb-8">
            <h1 className="text-gradient">ของหายได้คืน</h1>
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

            {status && (
              <p className="text-center text-sm font-medium text-red-600">
                {status}
              </p>
            )}

            <div className="text-center">
              <button type="submit" className="report-button">
                ส่งข้อมูล
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

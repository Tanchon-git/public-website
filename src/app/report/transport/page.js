"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    title: "วินมอเตอร์ไซค์",
    detail: "",
    vehicleId: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    try {
      const res = await fetch("/api/report/transport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("ส่งข้อมูลเรียบร้อยแล้ว ทางเราจะรีบติดต่อกลับโดยเร็ว");
        console.log(form);
        setForm({
          title: "วินมอเตอร์ไซค์",
          detail: "",
          vehicleId: "",
          email: "",
          phone: "",
        });
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
        <div className="max-w-3xl mx-auto">
          <div className="section-title mb-8">
            <h1 className="text-gradient">แจ้งปัญหาขนส่งภายใน</h1>
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
                <option value="วินมอเตอร์ไซค์">วินมอเตอร์ไซค์</option>
                <option value="รถ EV">รถ EV</option>
              </select>
            </div>

            <div>
              <label className="report-title">
                ป้ายทะเบียนรถ หรือ หมายเลขคนขับ
              </label>
              <input
                type="text"
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                className="report-input"
                placeholder="เช่น กข1234 หรือ หมายเลข 07"
                required
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

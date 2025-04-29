import { saveLostfoundReport } from "@/lib/googleSheets";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const detail = formData.get("detail");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const imageFiles = formData.getAll("images");

  if (!email.endsWith("@dome.tu.ac.th")) {
    return NextResponse.json(
      { error: "Email ต้องใช้ @dome.tu.ac.th เท่านั้น" },
      { status: 400 }
    );
  }

  try {
    const imageUrls = [];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(
        buffer,
        `${Date.now()}-${file.name}`
      );
      imageUrls.push(url);
    }

    await saveLostfoundReport({ title, detail, email, phone, imageUrls });
    return NextResponse.json({ error: "บันทึกข้อมูลสำเร็จ" }, { status: 200 });
  } catch (error) {
    console.error("บันทึกข้อมูลล้มเหลว:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

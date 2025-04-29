import { saveTransportReport } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, detail, vehicleId, email, phone } = await req.json();

  if (!email.endsWith("@dome.tu.ac.th")) {
    return NextResponse.json(
      { error: "Email ต้องใช้ @dome.tu.ac.th เท่านั้น" },
      { status: 400 }
    );
  }

  try {
    await saveTransportReport({ title, detail, vehicleId, email, phone });
    return NextResponse.json({ error: "บันทึกข้อมูลสำเร็จ" }, { status: 200 });
  } catch (error) {
    console.error("บันทึกข้อมูลล้มเหลว:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

import { saveOrUpdateWord, getWords } from "@/lib/googleSheets";
import { isProfane } from "@/lib/wordFilter";
import { NextResponse } from "next/server";

export async function GET() {
  const words = await getWords();
  return NextResponse.json(words);
}

export async function POST(req) {
  const { word } = await req.json();
  if (!word)
    return NextResponse.json({ error: "Missing word" }, { status: 400 });

  if (isProfane(word))
    return NextResponse.json(
      { error: "ไม่สามารถใช้คำนี้ได้!" },
      { status: 403 }
    );

  await saveOrUpdateWord(word);
  return NextResponse.json({ message: "Saved successfully" });
}

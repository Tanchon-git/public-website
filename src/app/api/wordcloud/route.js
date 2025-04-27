// pages/api/wordcloud-data.js
let allWords = [
  { name: "สวัสดี", value: 3 },
  { name: "สวัสดีครับ", value: 2 },
  { name: "สบายดีไหม", value: 1 },
  { name: "วันนี้อากาศดี", value: 1 },
  { name: "สบายดี", value: 1 },
  { name: "อากาศดีมาก", value: 1 },
  { name: "วันนี้", value: 1 },
]; // เก็บคำและความถี่ (ในหน่วยความจำ - สำหรับการทดลอง)

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { text } = req.body;
//     if (text) {
//       const words = text
//         .toLowerCase()
//         .split(/\s+/)
//         .filter((word) => word.length > 0);
//       words.forEach((word) => {
//         allWords[word] = (allWords[word] || 0) + 1;
//       });
//       res.status(200).json({ message: "Text received and processed." });
//     } else {
//       res.status(400).json({ error: "No text provided." });
//     }
//   } else if (req.method === "GET") {
//     // เตรียมข้อมูลสำหรับ Word Cloud (อาจเรียงตามความถี่)
//     const wordCloudData = Object.entries(allWords)
//       .sort(([, a], [, b]) => b - a)
//       .map(([text, value]) => ({ text, value }));
//     res.status(200).json(wordCloudData);
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export async function GET(req, res) {
  return Response.json(allWords);
}

// export async function GET(request) {
//   console.log("Test");
//   return Response.json({
//     name: "Tanchon",
//   });
// }

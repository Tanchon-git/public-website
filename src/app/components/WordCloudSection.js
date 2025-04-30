"use client";
import { useState, useEffect, useRef } from "react";
import {
  MousePointerClick,
  CircleCheckBig,
  CircleX,
  Loader,
} from "lucide-react";

export default function WordCloudSection() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    isOk: null,
    isWait: false,
  });
  const canvasRef = useRef(null);

  const fetchWords = async () => {
    const res = await fetch("/api/wordcloud");
    const data = await res.json();

    const formatted = data.map((word) => ({
      text: word.text,
      value: parseInt(word.value || "1", 10),
    }));
    setWords(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({
      message: "กำลังเพิ่มคำ... รอสักครู่",
      isOk: null,
      isWait: true,
    });

    if (!input.trim()) return;

    const res = await fetch("/api/wordcloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input.trim() }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data?.error) {
        setErrorMessage({ message: data?.error, isOk: false, isWait: false });
      } else {
        setErrorMessage({
          message: "เกิดข้อผิดพลาด ไม่สามารถเพิ่มคำได้",
          isOk: false,
          isWait: false,
        });
      }
      return;
    }

    setErrorMessage({
      message: "บันทึกสำเร็จ! ขอบคุณที่ร่วมแสดงความคิดเห็น",
      isOk: true,
      isWait: false,
    });
    fetchWords();
    setInput("");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !words.length) return;

    const ctx = canvas.getContext("2d");
    const containerWidth = window.innerWidth;
    const canvasWidth = containerWidth < 640 ? containerWidth * 0.9 : 600;
    const canvasHeight = 400;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const placedWords = [];

    function isOverlapping(x, y, w, h) {
      return placedWords.some((item) => {
        return (
          x < item.x + item.w &&
          x + w > item.x &&
          y < item.y + item.h &&
          y + h > item.y
        );
      });
    }

    words.forEach((word) => {
      const fontSize = word.value * 10 + 10;
      ctx.font = `${fontSize}px "DSFont"`;
      const textMetrics = ctx.measureText(word.text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 10) {
        const x = Math.random() * (canvasWidth - textWidth - 40) + 20;
        const y = Math.random() * (canvasHeight - textHeight - 40) + 20;

        if (!isOverlapping(x, y, textWidth, textHeight)) {
          placedWords.push({ x, y, w: textWidth, h: textHeight });

          ctx.save();
          ctx.translate(x + textWidth / 2, y + textHeight / 2);
          if (Math.random() > 0.5) {
            ctx.rotate((90 * Math.PI) / 180);
          }

          ctx.fillStyle = getRandomColor();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(word.text, 0, 0);
          ctx.restore();

          placed = true;
        }

        attempts++;
      }
    });
  }, [words]);

  useEffect(() => {
    fetchWords();
  }, []);

  function getRandomColor() {
    const colors = [
      "#F97316", // orange
      "#2563EB", // blue
      "#10B981", // green
      "#9333EA", // purple
      "#EF4444", // red
      "#0EA5E9", // sky blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <section id="event" className="section bg-white ">
      <div className="max-w-7xl px-4 py-12 text-center space-y-6">
        <h2 className="text-gradient">
          ขอ 1 คำ
          <br />
          ประเด็นที่อยากให้ธรรม(ทำ)ด้วยกัน
          <br />
          เพื่อชาวธรรมศาสตร์
        </h2>

        <form
          onSubmit={handleSubmit}
          className="text-xl sm:text-2xl flex flex-col md:items-center"
        >
          <div className="gap-2 md:gap-4 flex flex-col md:flex-row justify-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำที่คุณอยากแชร์..."
              className={`p-3 rounded-2xl border-2 w-full md:w-96 ${
                errorMessage.isOk ? "border-primary" : "border-red-600"
              }`}
            />
            <button
              type="submit"
              className="p-2 md:p-3 flex items-center justify-center gap-2 bg-primary text-white rounded-2xl hover:bg-orange-400 shadow-md/50 transition"
            >
              เพิ่มคำ
              <MousePointerClick size={24} />
            </button>
          </div>
          {errorMessage.message && (
            <p
              className={`report-status mt-3 ${
                errorMessage.isOk &&
                "bg-green-200 text-green-600 border-green-600"
              } ${
                errorMessage.isOk === false &&
                "bg-red-200 text-red-600 border-red-600"
              }
                ${
                  errorMessage.isWait &&
                  "bg-yellow-200 text-yellow-600 border-yellow-600"
                }
                  
              }`}
            >
              {errorMessage.isOk && <CircleCheckBig size={24} />}
              {errorMessage.isOk === false && <CircleX size={24} />}
              {errorMessage.isWait && <Loader size={24} />}
              {errorMessage.message}
            </p>
          )}
        </form>

        <div className="flex justify-center overflow-x-auto">
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}

"use client";
//FIXME: Can't use in production IOS view
import { useState, useEffect, useRef } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

export default function WordCloudSection() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const svgRef = useRef(null);
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
    setErrorMessage("");

    if (!input.trim()) return;

    const res = await fetch("/api/wordcloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: input.trim() }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data?.error) {
        setErrorMessage(data?.error);
      } else {
        setErrorMessage("เกิดข้อผิดพลาด ไม่สามารถเพิ่มคำได้");
      }
      return;
    }

    setInput("");
    fetchWords();
  };

  // useEffect(() => {
  //   if (!words.length) return;

  //   const layout = cloud()
  //     .size([600, 400])
  //     .words(words)
  //     .padding(5)
  //     .rotate(() => (Math.random() > 0.5 ? 0 : 90))
  //     .font("DSFont")
  //     .fontSize((d) => d.value * 30)
  //     .on("end", draw);

  //   layout.start();

  //   function draw(words) {
  //     const svg = d3.select(svgRef.current);
  //     svg.selectAll("*").remove();
  //     svg
  //       .attr("viewBox", "-300 -200 600 400")
  //       .append("g")
  //       .selectAll("text")
  //       .data(words)
  //       .join("text")
  //       .style("font-family", "DSFont, Arial, sans-serif")
  //       .style(
  //         "fill",
  //         () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
  //       )
  //       .attr("text-anchor", "middle")
  //       .attr(
  //         "transform",
  //         (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
  //       )
  //       .style("font-size", (d) => `${d.size}px`)
  //       .text((d) => d.text);
  //   }
  // }, [words]);

  useEffect(() => {
    if (!words.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    words.forEach((word) => {
      const fontSize = word.value * 10 + 10;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = getRandomColor();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = Math.random() * width;
      const y = Math.random() * height;
      const angle = (Math.random() > 0.5 ? 0 : 90) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(word.text, 0, 0);
      ctx.restore();
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
          ประเด็นที่อยากให้ธรรมด้วยกันเพื่อชาวธรรมศาสตร์
        </h2>

        <form
          onSubmit={handleSubmit}
          className="text-xl sm:text-2xl gap-2 md:gap-4 flex flex-col md:flex-row justify-center"
        >
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำที่คุณอยากแชร์..."
              className={`p-3 rounded-2xl border-2 w-full md:w-96 ${
                errorMessage.length > 0 ? "border-red-600" : "border-primary"
              }`}
            />
            {errorMessage && (
              <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="p-1 md:p-3 bg-primary text-white rounded-2xl hover:bg-orange-400 shadow-md/50 transition"
          >
            เพิ่มคำ
          </button>
        </form>

        <div className="flex justify-center">
          {/* <svg ref={svgRef} className="max-w-7xl" /> */}
          <canvas ref={canvasRef} width={600} height={400} />
        </div>
      </div>
    </section>
  );
}

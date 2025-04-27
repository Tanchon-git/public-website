"use client";

import { useState, useEffect, useRef } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

export default function WordCloudSection() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const svgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const inputWords = input.trim().split(/\s+/);
      setWords((prevWords) => {
        const updatedWords = [...prevWords];
        inputWords.forEach((word) => {
          const existingWord = updatedWords.find(
            (w) => w.text.toLowerCase() === word.toLowerCase()
          );
          if (existingWord) {
            existingWord.value += 20; // เพิ่มความใหญ่ถ้าคำนี้มีอยู่แล้ว
          } else {
            updatedWords.push({ text: word, value: 30 }); // ค่าเริ่มต้นสำหรับคำใหม่
          }
        });
        return updatedWords;
      });
      setInput("");
    }
  };

  useEffect(() => {
    if (!words.length) return;

    const layout = cloud()
      .size([600, 400])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("DSFont")
      .fontSize((d) => d.value)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      svg
        .attr("viewBox", "-300 -200 600 400")
        .append("g")
        .selectAll("text")
        .data(words)
        .join("text")
        .style("font-family", "DSFont")
        .style(
          "fill",
          () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        )
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
        )
        .style("font-size", (d) => `${d.size}px`)
        .text((d) => d.text);
    }
  }, [words]);

  return (
    <section id="event" className="section bg-white ">
      <div className="max-w-7xl px-4 py-12 text-center space-y-6">
        <h2 className="text-gradient">
          ขอ 1 คำ<br></br>
          ประเด็นที่อยากให้ธรรมด้วยกันเพื่อชาวธรรมศาสตร์
        </h2>

        <form
          onSubmit={handleSubmit}
          className="text-xl sm:text-2xl flex flex-col md:flex-row gap-2 md:gap-4 justify-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์คำที่คุณอยากแชร์..."
            className="p-3 rounded-2xl border-2 border-primary w-full md:w-96"
          />
          <button
            type="submit"
            className="p-1 md:p-3 bg-primary text-white rounded-2xl hover:bg-orange-400 shadow-md/50 transition"
          >
            เพิ่มคำ
          </button>
        </form>

        <div className="flex justify-center">
          <svg ref={svgRef} className="max-w-7xl" />
        </div>
      </div>
    </section>
  );
}

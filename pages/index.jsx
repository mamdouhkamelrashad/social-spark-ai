import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("");
  const [mood, setMood] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePost = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, style, mood }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🔥 Social Spark AI</h1>
      <p>ولّعها على السوشيال 🤖</p>
      <input placeholder="المجال (مثلاً: التسويق)" onChange={e => setTopic(e.target.value)} />
      <input placeholder="الأسلوب (مثلاً: مرح، رسمي)" onChange={e => setStyle(e.target.value)} />
      <input placeholder="المزاج (مثلاً: تحفيزي)" onChange={e => setMood(e.target.value)} />
      <button onClick={generatePost} disabled={loading}>
        {loading ? "جارٍ التوليد..." : "ولّعها 🔥"}
      </button>
      <pre style={{ background: "#eee", padding: "1rem", marginTop: "1rem" }}>{result}</pre>
    </main>
  );
}

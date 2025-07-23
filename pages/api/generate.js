import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { topic, style, mood } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a content generator that writes catchy social media posts.",
        },
        {
          role: "user",
          content: `اكتبلي منشور لمجال ${topic}، بأسلوب ${style}، ومزاج ${mood}`,
        },
      ],
    });

    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

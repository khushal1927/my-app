import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: false, // use false if you want simple responses, true for streaming
    messages,
  });

  res.status(200).json({ result: response.choices[0].message });
}

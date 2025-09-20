import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define the expected shape of messages
interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: ChatMessage[] };

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return NextResponse.json({ result: response.choices[0].message });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

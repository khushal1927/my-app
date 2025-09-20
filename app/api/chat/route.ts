import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Type for messages expected from the frontend
interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body: { messages: ChatMessage[] } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.messages,
    });

    return NextResponse.json({ result: response.choices[0].message });
  } catch (err) {
    // Type-safe error handling
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}

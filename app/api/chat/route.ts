import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {
  const { message } = await req.json();
 
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are CareMate, a friendly and knowledgeable virtual audio based healthcare assistant. You help users manage their appointments, and patient data. Always respond clearly and kindly. If a question involves serious medical issues, politely remind the user to consult a licensed doctor" },
          { role: "user", content: message }
        ],
      }),
    });
 
    const data = await res.json();
 
    console.log("🔍 FULL OpenAI Response:", JSON.stringify(data, null, 2));
 
    const content = data?.choices?.[0]?.message?.content;
 
    if (!content) {
      return NextResponse.json({
        reply: "Error: Could not extract response from OpenAI.",
        debug: data,
      });
    }
 
    return NextResponse.json({ reply: content });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    return NextResponse.json({ reply: "API call failed." });
  }
}
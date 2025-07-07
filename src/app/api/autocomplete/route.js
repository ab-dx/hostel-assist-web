"use server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const json_data = await request.json();
  const image_url = json_data.image_url;
  const system_prompt =
    "You are a maintenance evaluation assisstant, given an image of the problem, you must determine whether the problem type is: Plumbing, Electrical, Carpentry, Sanitary, Housekeeping, Structural, Safety, also describe any relevant details in additional remarks";
  function extractMimeAndData(dataUrl) {
    if (!dataUrl.startsWith('data:')) return { mime: null, data: null };
    const [header, base64Data] = dataUrl.split(',', 2);
    // header: "data:image/png;base64"
    const mimeMatch = header.match(/^data:([^;]+);base64$/);
    const mime = mimeMatch ? mimeMatch[1] : null;
    return { mime, data: base64Data };
  }
  console.log(image_url)
  try {
    const apiKey = process.env.GEMINI_API;
    const { mime, data } = extractMimeAndData(image_url);
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        system_instruction: { parts: { text: system_prompt } },
        contents: [{
          role: "user", parts: [{
            "inline_data": {
              "mime_type": mime,
              "data": data
            }
          }, { text: "Help evaluate this image" }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              problem_type: { "type": "STRING" },
              remarks: { "type": "STRING" },
            }
          }
        }
      },
    );
    console.log(response)
    return NextResponse.json(response.data.candidates[0].content.parts[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Gemini response failed" },
      { status: 500 },
    );
  }
}

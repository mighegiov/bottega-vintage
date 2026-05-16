import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt mancante" }, { status: 400 });
    }

    const promptCompleto = `A beautiful interior design photo of a room decorated in the style of: ${prompt}. Professional interior photography, high quality, realistic, well-lit, cozy atmosphere, no people.`;

    const response = await fetch(
      "https://api-inference.huggingface.co/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "stabilityai/stable-diffusion-xl-base-1.0",
          prompt: promptCompleto,
          n: 1,
          size: "1024x576",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Errore Hugging Face:", errorText);
      return NextResponse.json(
        { error: "Errore generazione immagine" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Risposta HF:", JSON.stringify(data).slice(0, 300));

    const imageUrl = data?.data?.[0]?.url || null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Nessuna immagine generata" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Errore generazione immagine:", error);
    return NextResponse.json(
      { error: "Errore nella generazione dell'immagine" },
      { status: 500 }
    );
  }
}
"use client";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
export default function ArredaPage() {
  const [foto, setFoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [risposta, setRisposta] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenera = async () => {
    if (!prompt) return;
    setLoading(true);
    setRisposta("");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: foto
              ? [
                  {
                    type: "image",
                    source: {
                      type: "base64",
                      media_type: "image/jpeg",
                      data: foto.split(",")[1],
                    },
                  },
                  {
                    type: "text",
                    text: `Sei un interior designer esperto. Analizza questa stanza e suggerisci come arredarla secondo questo stile: "${prompt}". Descrivi 3-4 elementi chiave da cambiare o aggiungere, con il tipo di mobile, il materiale consigliato e dove posizionarlo. Sii specifico e pratico.`,
                  },
                ]
              : [
                  {
                    type: "text",
                    text: `Sei un interior designer esperto. Suggerisci come arredare una stanza secondo questo stile: "${prompt}". Descrivi 3-4 elementi chiave: tipo di mobile, materiale consigliato e posizionamento. Sii specifico e pratico.`,
                  },
                ],
          },
        ],
      }),
    });

    const data = await response.json();
    const testo = data.content?.[0]?.text || "Nessuna risposta ricevuta.";
    setRisposta(testo);
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        fontFamily: "'Georgia', serif",
        padding: "6rem 2rem 4rem",
      }}
    >
      {/* Nav minimalista */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "1.5rem 3rem",
          background: "rgba(245,240,232,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(139,90,43,0.15)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8B5A2B",
            textDecoration: "none",
          }}
        >
          ← Home
        </a>
        <span style={{ color: "rgba(139,90,43,0.3)" }}>|</span>
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#5C3D1E",
          }}
        >
          Arreda la tua stanza
        </span>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Titolo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#8B5A2B",
              marginBottom: "1rem",
            }}
          >
            AI Interior Design
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "400",
              color: "#2C1A0E",
              lineHeight: "1.2",
            }}
          >
            Descrivi la tua <em style={{ color: "#8B5A2B" }}>visione</em>
          </h1>
        </div>

        {/* Upload foto */}
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: "1px dashed rgba(139,90,43,0.4)",
            borderRadius: "2px",
            padding: "3rem",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "1.5rem",
            background: foto ? "transparent" : "rgba(139,90,43,0.03)",
            transition: "background 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {foto ? (
            <img
              src={foto}
              alt="La tua stanza"
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "2px",
              }}
            />
          ) : (
            <div>
              <p
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                  opacity: 0.4,
                }}
              >
                📷
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#8B5A2B",
                  letterSpacing: "0.05em",
                }}
              >
                Carica una foto della tua stanza
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(92,61,30,0.5)",
                  marginTop: "0.4rem",
                }}
              >
                (opzionale — puoi procedere anche senza)
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFoto}
            style={{ display: "none" }}
          />
        </div>

        {foto && (
          <button
            onClick={() => setFoto(null)}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.75rem",
              color: "#8B5A2B",
              cursor: "pointer",
              marginBottom: "1.5rem",
              letterSpacing: "0.1em",
            }}
          >
            ✕ Rimuovi foto
          </button>
        )}

        {/* Prompt stile */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8B5A2B",
              marginBottom: "0.75rem",
            }}
          >
            Descrivi lo stile che desideri
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Es: voglio qualcosa di caldo e naturale, con legno massello e tessuti in lino. Mi piace il mix tra antico e contemporaneo..."
            rows={4}
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              border: "1px solid rgba(139,90,43,0.3)",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.5)",
              fontFamily: "'Georgia', serif",
              fontSize: "0.95rem",
              color: "#2C1A0E",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              lineHeight: "1.7",
            }}
          />
        </div>

        {/* Bottone */}
        <button
          onClick={handleGenera}
          disabled={loading || !prompt}
          style={{
            width: "100%",
            padding: "1.1rem",
            background: prompt && !loading ? "#5C3D1E" : "rgba(92,61,30,0.3)",
            color: "#F5F0E8",
            border: "none",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: prompt && !loading ? "pointer" : "not-allowed",
            transition: "background 0.3s",
            marginBottom: "2rem",
          }}
        >
          {loading ? "L'AI sta elaborando..." : "Genera suggerimenti"}
        </button>

        {/* Risposta AI */}
        {risposta && (
          <div
            style={{
              background: "#2C1A0E",
              padding: "2.5rem",
              borderRadius: "2px",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#8B5A2B",
                marginBottom: "1.25rem",
              }}
            >
              Suggerimenti dell'AI
            </p>
            <div style={{ color: "#F5F0E8", fontSize: "0.95rem", lineHeight: "1.9" }}>
  <ReactMarkdown>{risposta}</ReactMarkdown>
</div>
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(245,240,232,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(245,240,232,0.5)",
                  marginBottom: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                Trovare questi pezzi vicino a te:
              </p>
              <a
                href="/artigiani"
                style={{
                  display: "inline-block",
                  padding: "0.8rem 2rem",
                  border: "1px solid rgba(139,90,43,0.5)",
                  color: "#8B5A2B",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Scopri gli artigiani →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
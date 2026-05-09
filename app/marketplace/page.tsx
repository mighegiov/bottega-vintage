"use client";
import { useState } from "react";

const prodotti = [
  {
    id: 1,
    nome: "Cassettiera in noce anni '50",
    artigiano: "Bottega Ceccherini",
    citta: "Greve in Chianti",
    prezzo: 480,
    stili: ["Vintage", "Classico"],
    categoria: "Contenitori",
    emoji: "🪵",
    descrizione: "Cassettiera originale anni '50 restaurata a mano. Legno di noce massello con maniglie in ottone originali.",
    disponibile: true,
  },
  {
    id: 2,
    nome: "Letto in ferro battuto",
    artigiano: "Ferro e Fuoco",
    citta: "Arezzo",
    prezzo: 1200,
    stili: ["Vintage", "Rustico"],
    categoria: "Letti",
    emoji: "🛏️",
    descrizione: "Letto matrimoniale in ferro battuto lavorato a mano. Testiera con decorazioni floreali tipiche degli anni '40.",
    disponibile: true,
  },
  {
    id: 3,
    nome: "Lampada in ceramica dipinta",
    artigiano: "Studio Ceramiche Bianchi",
    citta: "Montalcino",
    prezzo: 195,
    stili: ["Vintage", "Bohémien", "Mediterraneo"],
    categoria: "Illuminazione",
    emoji: "🏺",
    descrizione: "Lampada da tavolo in ceramica smaltata a mano con decori floreali nei toni del turchese e del terracotta.",
    disponibile: true,
  },
  {
    id: 4,
    nome: "Tavolo in rovere massello",
    artigiano: "Falegnameria Moretti",
    citta: "Siena",
    prezzo: 890,
    stili: ["Moderno", "Japandi", "Minimal"],
    categoria: "Tavoli",
    emoji: "🪑",
    descrizione: "Tavolo da pranzo in rovere massello con finitura naturale ad olio. Design pulito, produzione su misura.",
    disponibile: true,
  },
  {
    id: 5,
    nome: "Kilim berbero vintage",
    artigiano: "Tappeti & Tessuti Rossi",
    citta: "Firenze",
    prezzo: 320,
    stili: ["Bohémien", "Vintage", "Orientale"],
    categoria: "Tappeti",
    emoji: "🧵",
    descrizione: "Kilim berbero originale anni '70, lana naturale tinta con coloranti vegetali. Misura 160x240 cm.",
    disponibile: false,
  },
  {
    id: 6,
    nome: "Specchiera con cornice dorata",
    artigiano: "Bottega Ceccherini",
    citta: "Greve in Chianti",
    prezzo: 650,
    stili: ["Classico", "Art Déco", "Vintage"],
    categoria: "Specchi",
    emoji: "🪞",
    descrizione: "Specchiera da parete con cornice in legno intagliato e foglia oro anticata. Stile neoclassico, 80x120 cm.",
    disponibile: true,
  },
];

const categorie = ["Tutti", ...Array.from(new Set(prodotti.map((p) => p.categoria)))];
const stiliDisponibili = ["Tutti", ...Array.from(new Set(prodotti.flatMap((p) => p.stili)))];

export default function MarketplacePage() {
  const [categoriaAttiva, setCategoriaAttiva] = useState("Tutti");
  const [stileAttivo, setStileAttivo] = useState("Tutti");
  const [prodottoAperto, setProdottoAperto] = useState<number | null>(null);

  const prodottiFiltrati = prodotti.filter((p) => {
    const catOk = categoriaAttiva === "Tutti" || p.categoria === categoriaAttiva;
    const stileOk = stileAttivo === "Tutti" || p.stili.includes(stileAttivo);
    return catOk && stileOk;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#F5F0E8", fontFamily: "'Georgia', serif" }}>
      {/* Nav */}
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
        <a href="/" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", textDecoration: "none" }}>
          ← Home
        </a>
        <span style={{ color: "rgba(139,90,43,0.3)" }}>|</span>
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C3D1E" }}>
          Marketplace
        </span>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        {/* Titolo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "1rem" }}>
            Marketplace
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "400", color: "#2C1A0E" }}>
            Pezzi unici, <em style={{ color: "#8B5A2B" }}>fatti a mano</em>
          </h1>
        </div>

        {/* Filtri */}
        <div style={{ marginBottom: "2rem" }}>
          {/* Categorie */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {categorie.map((c) => (
              <button
                key={c}
                onClick={() => setCategoriaAttiva(c)}
                style={{
                  padding: "0.5rem 1.25rem",
                  border: "1px solid rgba(139,90,43,0.3)",
                  background: categoriaAttiva === c ? "#5C3D1E" : "transparent",
                  color: categoriaAttiva === c ? "#F5F0E8" : "#5C3D1E",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  borderRadius: "20px",
                  transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Stili */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {stiliDisponibili.map((s) => (
              <button
                key={s}
                onClick={() => setStileAttivo(s)}
                style={{
                  padding: "0.4rem 1rem",
                  border: "1px solid rgba(139,90,43,0.2)",
                  background: stileAttivo === s ? "#8B5A2B" : "transparent",
                  color: stileAttivo === s ? "#F5F0E8" : "#8B5A2B",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  borderRadius: "20px",
                  transition: "all 0.2s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Conteggio */}
        <p style={{ fontSize: "0.8rem", color: "rgba(92,61,30,0.5)", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
          {prodottiFiltrati.length} pezzi disponibili
        </p>

        {/* Griglia */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {prodottiFiltrati.map((p) => (
            <div
              key={p.id}
              onClick={() => setProdottoAperto(prodottoAperto === p.id ? null : p.id)}
              style={{
                background: "white",
                border: "1px solid rgba(139,90,43,0.15)",
                borderRadius: "2px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                opacity: p.disponibile ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(92,61,30,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Immagine placeholder */}
              <div
                style={{
                  height: "180px",
                  background: "linear-gradient(135deg, #F5F0E8, #E8DDD0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  position: "relative",
                }}
              >
                {p.emoji}
                {!p.disponibile && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "#2C1A0E",
                      color: "#F5F0E8",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      padding: "0.3rem 0.6rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Esaurito
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: "0.7rem", color: "#8B5A2B", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                  {p.categoria}
                </p>
                <h3 style={{ fontSize: "1rem", fontWeight: "400", color: "#2C1A0E", marginBottom: "0.4rem", lineHeight: "1.4" }}>
                  {p.nome}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(92,61,30,0.6)", marginBottom: "0.75rem" }}>
                  {p.artigiano} · {p.citta}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.1rem", color: "#2C1A0E", fontWeight: "400" }}>
                    € {p.prezzo.toLocaleString("it-IT")}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#8B5A2B" }}>
                    {prodottoAperto === p.id ? "▲ chiudi" : "▼ dettagli"}
                  </span>
                </div>
              </div>

              {/* Dettaglio espanso */}
              {prodottoAperto === p.id && (
                <div style={{ padding: "1.25rem", borderTop: "1px solid rgba(139,90,43,0.1)", background: "#FDFAF5" }}>
                  <p style={{ fontSize: "0.85rem", color: "#5C3D1E", lineHeight: "1.8", marginBottom: "1rem" }}>
                    {p.descrizione}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    {p.stili.map((s) => (
                      <span key={s} style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem", border: "1px solid rgba(139,90,43,0.3)", color: "#8B5A2B", borderRadius: "20px" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.disponibile && (
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "#5C3D1E",
                        color: "#F5F0E8",
                        border: "none",
                        fontSize: "0.8rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      Contatta l'artigiano
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA artigiani */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2.5rem",
            background: "#2C1A0E",
            textAlign: "center",
            borderRadius: "2px",
          }}
        >
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "0.75rem" }}>
            Sei un artigiano?
          </p>
          <p style={{ color: "#F5F0E8", fontSize: "1rem", marginBottom: "1.5rem", lineHeight: "1.7", opacity: 0.8 }}>
            Carica i tuoi pezzi e raggiungi clienti che cercano esattamente quello che sai fare.
          </p>
          <a
            href="/artigiani"
            style={{
              display: "inline-block",
              padding: "0.85rem 2.5rem",
              border: "1px solid rgba(139,90,43,0.5)",
              color: "#8B5A2B",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scopri come entrare →
          </a>
        </div>
      </div>
    </main>
  );
}
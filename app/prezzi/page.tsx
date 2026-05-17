"use client";
import { useState } from "react";

export default function PrezziPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAbbonamento = async (tipo: string) => {
    setLoading(tipo);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Errore checkout:", error);
    }
    setLoading(null);
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
          Piani e Prezzi
        </span>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Titolo */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "1rem" }}>
            Piani e Prezzi
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "400", color: "#2C1A0E", marginBottom: "1rem" }}>
            Scegli il tuo <em style={{ color: "#8B5A2B" }}>piano</em>
          </h1>
          <p style={{ color: "rgba(92,61,30,0.6)", fontSize: "1rem", lineHeight: "1.7" }}>
            Inizia gratis con una immagine di prova. Passa a Pro per immagini illimitate.
          </p>
        </div>

        {/* Piani Utenti */}
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "1.5rem" }}>
          Per gli utenti
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          
          {/* Piano Free */}
          <div style={{ background: "white", border: "1px solid rgba(139,90,43,0.15)", borderRadius: "2px", padding: "2rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "0.75rem" }}>Free</p>
            <div style={{ fontSize: "2.5rem", color: "#2C1A0E", marginBottom: "0.5rem", fontWeight: "300" }}>€0</div>
            <p style={{ fontSize: "0.85rem", color: "rgba(92,61,30,0.5)", marginBottom: "1.5rem" }}>per sempre</p>
            <div style={{ borderTop: "1px solid rgba(139,90,43,0.1)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              {["1 immagine di prova", "Suggerimenti AI illimitati", "Accesso al marketplace", "Ricerca artigiani"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", fontSize: "0.85rem", color: "#5C3D1E" }}>
                  <span style={{ color: "#8B5A2B" }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a href="/arreda" style={{ display: "block", textAlign: "center", padding: "0.85rem", border: "1px solid rgba(139,90,43,0.3)", color: "#8B5A2B", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Inizia gratis
            </a>
          </div>

          {/* Piano Pro */}
          <div style={{ background: "#2C1A0E", border: "1px solid #2C1A0E", borderRadius: "2px", padding: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "-1px", right: "1.5rem", background: "#8B5A2B", color: "#F5F0E8", fontSize: "0.65rem", letterSpacing: "0.15em", padding: "0.3rem 0.75rem", textTransform: "uppercase" }}>
              Consigliato
            </div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "0.75rem" }}>Pro</p>
            <div style={{ fontSize: "2.5rem", color: "#F5F0E8", marginBottom: "0.5rem", fontWeight: "300" }}>€3</div>
            <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", marginBottom: "1.5rem" }}>al mese</p>
            <div style={{ borderTop: "1px solid rgba(245,240,232,0.1)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              {["Immagini AI illimitate", "Suggerimenti AI illimitati", "Accesso al marketplace", "Ricerca artigiani", "Supporto prioritario"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", fontSize: "0.85rem", color: "#F5F0E8" }}>
                  <span style={{ color: "#8B5A2B" }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAbbonamento("pro")}
              disabled={loading === "pro"}
              style={{ display: "block", width: "100%", textAlign: "center", padding: "0.85rem", background: "#8B5A2B", color: "#F5F0E8", border: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
            >
              {loading === "pro" ? "Caricamento..." : "Abbonati a Pro"}
            </button>
          </div>
        </div>

        {/* Piani Artigiani */}
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "1.5rem" }}>
          Per gli artigiani
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          
          {[
            { tipo: "base", nome: "Base", prezzo: "€5", prodotti: "10 prodotti", features: ["Profilo artigiano", "Fino a 10 prodotti", "Badge verificato", "Geolocalizzazione"] },
            { tipo: "standard", nome: "Standard", prezzo: "€10", prodotti: "30 prodotti", features: ["Profilo artigiano", "Fino a 30 prodotti", "Badge verificato", "Geolocalizzazione", "Posizione prioritaria"] },
            { tipo: "premium", nome: "Premium", prezzo: "€20", prodotti: "Illimitati", features: ["Profilo artigiano", "Prodotti illimitati", "Badge verificato", "Geolocalizzazione", "Posizione prioritaria", "Statistiche avanzate"] },
          ].map((piano) => (
            <div key={piano.tipo} style={{ background: "white", border: "1px solid rgba(139,90,43,0.15)", borderRadius: "2px", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "0.75rem" }}>{piano.nome}</p>
              <div style={{ fontSize: "2rem", color: "#2C1A0E", marginBottom: "0.25rem", fontWeight: "300" }}>{piano.prezzo}</div>
              <p style={{ fontSize: "0.85rem", color: "rgba(92,61,30,0.5)", marginBottom: "0.5rem" }}>al mese</p>
              <p style={{ fontSize: "0.8rem", color: "#8B5A2B", marginBottom: "1.25rem", fontWeight: "400" }}>{piano.prodotti}</p>
              <div style={{ borderTop: "1px solid rgba(139,90,43,0.1)", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                {piano.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", fontSize: "0.82rem", color: "#5C3D1E" }}>
                    <span style={{ color: "#8B5A2B" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAbbonamento(piano.tipo)}
                disabled={loading === piano.tipo}
                style={{ display: "block", width: "100%", textAlign: "center", padding: "0.75rem", background: "#5C3D1E", color: "#F5F0E8", border: "none", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
              >
                {loading === piano.tipo ? "Caricamento..." : `Abbonati ${piano.nome}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
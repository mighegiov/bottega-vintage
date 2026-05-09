"use client";
import { useState, useEffect } from "react";

const artigiani = [
  {
    id: 1,
    nome: "Bottega Ceccherini",
    specialita: "Restauro mobili antichi",
    stili: ["Vintage", "Classico", "Shabby Chic"],
    citta: "Greve in Chianti",
    lat: 43.5847,
    lng: 11.3089,
    rating: 4.9,
    recensioni: 47,
    bio: "Tre generazioni di restauratori. Specializziamo nel recupero di mobili dell'800 e primi '900, restituendo vita a pezzi unici.",
    prodotti: ["Credenze", "Cassettiere", "Specchiere"],
    foto: "🪑",
  },
  {
    id: 2,
    nome: "Falegnameria Moretti",
    specialita: "Mobili su misura in legno massello",
    stili: ["Moderno", "Minimal", "Japandi", "Rustico"],
    citta: "Siena",
    lat: 43.3188,
    lng: 11.3308,
    rating: 4.7,
    recensioni: 83,
    bio: "Creiamo mobili su misura partendo da legni selezionati. Ogni pezzo è progettato insieme al cliente per adattarsi perfettamente allo spazio.",
    prodotti: ["Letti", "Librerie", "Tavoli"],
    foto: "🪵",
  },
  {
    id: 3,
    nome: "Studio Ceramiche Bianchi",
    specialita: "Ceramica artistica e lampade",
    stili: ["Vintage", "Bohémien", "Art Déco", "Mediterraneo"],
    citta: "Montalcino",
    lat: 43.0559,
    lng: 11.4886,
    rating: 5.0,
    recensioni: 31,
    bio: "Lampade, vasi e oggetti decorativi in ceramica fatti a mano. Ogni pezzo è unico, smaltato e cotto nel nostro forno a legna.",
    prodotti: ["Lampade", "Vasi", "Mattonelle"],
    foto: "🏺",
  },
  {
    id: 4,
    nome: "Ferro e Fuoco",
    specialita: "Ferro battuto e ottone",
    stili: ["Industrial", "Vintage", "Rustico"],
    citta: "Arezzo",
    lat: 43.4636,
    lng: 11.8796,
    rating: 4.8,
    recensioni: 56,
    bio: "Fabbrica artigianale specializzata in letti, testiere e arredi in ferro battuto lavorati a mano con tecniche tradizionali.",
    prodotti: ["Letti", "Testiere", "Lampade a sospensione"],
    foto: "⚒️",
  },
  {
    id: 5,
    nome: "Tappeti & Tessuti Rossi",
    specialita: "Tessuti e tappeti artigianali",
    stili: ["Bohémien", "Vintage", "Classico", "Orientale"],
    citta: "Firenze",
    lat: 43.7696,
    lng: 11.2558,
    rating: 4.6,
    recensioni: 112,
    bio: "Importatori e artigiani del tessuto. Proponiamo kilim, tappeti persiani vintage e tessuti naturali per tappezzeria su misura.",
    prodotti: ["Tappeti", "Kilim", "Tessuti per tappezzeria"],
    foto: "🧵",
  },
];

function distanzaKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function ArtigianiPage() {
  const [posizione, setPosizione] = useState<{ lat: number; lng: number } | null>(null);
  const [range, setRange] = useState(100);
  const [filtroStile, setFiltroStile] = useState("Tutti");
  const [geoError, setGeoError] = useState(false);
  const [artigianoAperto, setArtigianoAperto] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosizione({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setGeoError(true)
      );
    }
  }, []);

  const stiliDisponibili = ["Tutti", ...Array.from(new Set(artigiani.flatMap((a) => a.stili)))];

  const artigianiFiltrati = artigiani
    .map((a) => ({
      ...a,
      distanza: posizione ? distanzaKm(posizione.lat, posizione.lng, a.lat, a.lng) : null,
    }))
    .filter((a) => {
      const dentroRange = a.distanza === null || a.distanza <= range;
      const stileOk = filtroStile === "Tutti" || a.stili.includes(filtroStile);
      return dentroRange && stileOk;
    })
    .sort((a, b) => {
      if (a.distanza !== null && b.distanza !== null) return a.distanza - b.distanza;
      return b.rating - a.rating;
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
          Artigiani
        </span>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        {/* Titolo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "1rem" }}>
            Artigiani Toscani
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "400", color: "#2C1A0E" }}>
            Fatto a mano, <em style={{ color: "#8B5A2B" }}>vicino a te</em>
          </h1>
        </div>

        {/* Geo banner */}
        {!posizione && !geoError && (
          <div style={{ background: "#2C1A0E", color: "#F5F0E8", padding: "1rem 1.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", borderRadius: "2px", textAlign: "center" }}>
            📍 Stiamo rilevando la tua posizione per mostrarti gli artigiani più vicini...
          </div>
        )}
        {geoError && (
          <div style={{ background: "rgba(139,90,43,0.1)", border: "1px solid rgba(139,90,43,0.3)", padding: "1rem 1.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", borderRadius: "2px", color: "#5C3D1E" }}>
            📍 Posizione non disponibile — mostriamo tutti gli artigiani ordinati per rating.
          </div>
        )}

        {/* Filtri */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem", padding: "1.5rem", background: "white", borderRadius: "2px", border: "1px solid rgba(139,90,43,0.15)" }}>
          {posizione && (
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", display: "block", marginBottom: "0.5rem" }}>
                Raggio: {range} km
              </label>
              <input
                type="range"
                min={10}
                max={200}
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#8B5A2B" }}
              />
            </div>
          )}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5A2B", display: "block", marginBottom: "0.5rem" }}>
              Stile
            </label>
            <select
              value={filtroStile}
              onChange={(e) => setFiltroStile(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", border: "1px solid rgba(139,90,43,0.3)", background: "white", fontFamily: "'Georgia', serif", fontSize: "0.9rem", color: "#2C1A0E" }}
            >
              {stiliDisponibili.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Lista artigiani */}
        {artigianiFiltrati.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#8B5A2B", opacity: 0.6 }}>
            Nessun artigiano trovato in questo raggio. Prova ad aumentare il range.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {artigianiFiltrati.map((a) => (
              <div
                key={a.id}
                style={{
                  background: "white",
                  border: "1px solid rgba(139,90,43,0.15)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setArtigianoAperto(artigianoAperto === a.id ? null : a.id)}
              >
                <div style={{ padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{a.foto}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: "400", color: "#2C1A0E", marginBottom: "0.25rem" }}>{a.nome}</h2>
                        <p style={{ fontSize: "0.85rem", color: "#8B5A2B", marginBottom: "0.5rem" }}>{a.specialita}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1rem", color: "#2C1A0E" }}>
                          {"★".repeat(Math.floor(a.rating))} <span style={{ fontSize: "0.85rem" }}>{a.rating}</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(92,61,30,0.5)" }}>{a.recensioni} recensioni</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "rgba(92,61,30,0.6)" }}>📍 {a.citta}</span>
                      {a.distanza !== null && (
                        <span style={{ fontSize: "0.75rem", background: "#F5F0E8", padding: "0.2rem 0.6rem", color: "#8B5A2B", borderRadius: "20px" }}>
                          {a.distanza} km da te
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dettaglio espanso */}
                {artigianoAperto === a.id && (
                  <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(139,90,43,0.1)", background: "#FDFAF5" }}>
                    <p style={{ fontSize: "0.9rem", color: "#5C3D1E", lineHeight: "1.8", marginBottom: "1rem" }}>{a.bio}</p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <div>
                        <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B5A2B", marginBottom: "0.4rem" }}>Produce</p>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {a.prodotti.map((p) => (
                            <span key={p} style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", border: "1px solid rgba(139,90,43,0.3)", color: "#5C3D1E", borderRadius: "20px" }}>{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        marginTop: "1.25rem",
                        padding: "0.75rem 1.75rem",
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
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
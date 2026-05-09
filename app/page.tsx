"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139,90,43,0.07) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(101,67,33,0.05) 0%, transparent 50%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 3rem",
          zIndex: 10,
          borderBottom: "1px solid rgba(139,90,43,0.15)",
          background: "rgba(245,240,232,0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#5C3D1E",
            fontWeight: "400",
          }}
        >
          Bottega Vintage
        </span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {[
            { label: "Artigiani", href: "/artigiani" },
            { label: "Marketplace", href: "/marketplace" },
            { label: "Chi siamo", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#8B5A2B",
                textDecoration: "none",
                opacity: 0.8,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: loaded ? "80px" : "0px",
            height: "1px",
            background: "#8B5A2B",
            marginBottom: "2rem",
            transition: "width 1s ease 0.2s",
          }}
        />

        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#8B5A2B",
            marginBottom: "1.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          Arredamento su misura · Toscana
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: "400",
            color: "#2C1A0E",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.4s",
          }}
        >
          La tua stanza,<br />
          <em style={{ color: "#8B5A2B" }}>reinventata</em>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#5C3D1E",
            maxWidth: "480px",
            lineHeight: "1.8",
            marginBottom: "3rem",
            opacity: loaded ? 0.8 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          Carica una foto della tua stanza, descrivi il tuo stile ideale.
          L'AI la reinterpreta e ti connette agli artigiani della tua zona.
        </p>

        <Link
          href="/arreda"
          style={{
            display: "inline-block",
            padding: "1.1rem 3rem",
            background: "#5C3D1E",
            color: "#F5F0E8",
            textDecoration: "none",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s ease 0.7s, background 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#8B5A2B";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#5C3D1E";
          }}
        >
          Arreda la tua stanza
        </Link>

        {/* Decorative bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.4,
          }}
        >
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#5C3D1E" }}>
            SCORRI
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "#8B5A2B",
            }}
          />
        </div>
      </section>

      {/* Features strip */}
      <section
        style={{
          background: "#2C1A0E",
          padding: "4rem 3rem",
          display: "flex",
          justifyContent: "center",
          gap: "6rem",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { num: "01", title: "Carica la foto", desc: "La tua stanza com'è oggi" },
          { num: "02", title: "Descrivi lo stile", desc: "Parole libere, l'AI interpreta" },
          { num: "03", title: "Scopri gli artigiani", desc: "Vicini a te, valutati dalla community" },
        ].map((item) => (
          <div key={item.num} style={{ textAlign: "center", maxWidth: "200px" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#8B5A2B", marginBottom: "0.75rem" }}>
              {item.num}
            </p>
            <p style={{ fontSize: "1rem", color: "#F5F0E8", marginBottom: "0.5rem", fontWeight: "400" }}>
              {item.title}
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", lineHeight: "1.6" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
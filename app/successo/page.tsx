"use client";
import Link from "next/link";
export default function SuccessoPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#F5F0E8", fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🎉</div>
        <h1 style={{ fontSize: "2rem", fontWeight: "400", color: "#2C1A0E", marginBottom: "1rem" }}>Pagamento completato!</h1>
        <p style={{ color: "rgba(92,61,30,0.6)", marginBottom: "2rem" }}>Il tuo abbonamento e attivo.</p>
        <Link href="/arreda" style={{ padding: "1rem 2.5rem", background: "#5C3D1E", color: "#F5F0E8", textDecoration: "none", fontSize: "0.85rem" }}>Inizia ad arredare</Link>
      </div>
    </main>
  );
}

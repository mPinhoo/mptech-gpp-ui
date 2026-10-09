import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Equivalentes em hex dos tokens oklch do tema (o gerador de imagens não suporta oklch). */
const PRIMARY = "#1745c2";
const PRIMARY_LIGHT = "#4076f5";
const BACKGROUND = "#070709";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 80% 0%, ${PRIMARY} 0%, ${BACKGROUND} 60%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill={PRIMARY_LIGHT} />
            <path
              d="M10.5 10.5h11L10.5 21.5h11"
              fill="none"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.72)", maxWidth: 900, lineHeight: 1.35 }}>
            Clientes, pedidos, orçamentos, agenda e resultados em um só lugar.
          </div>
        </div>
      </div>
    ),
    size
  );
}

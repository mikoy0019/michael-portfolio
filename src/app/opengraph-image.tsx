import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt ="Michael Tejada — Full-stack developer, AI & automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#08080C", color: "#f3f4f7", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#9568FF", color: "#08080C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>MT</div>
          <div style={{ fontSize: 30, color: "#c3c7d2" }}>Michael Tejada</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
          Full-stack products and the AI automations that keep them running.
        </div>
        <div style={{ fontSize: 26, color: "#8a8fa0" }}>Next.js · Supabase · Cloudflare · Expo · n8n · Open to remote roles</div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const alt = "OG Card Inspector — preview social cards and audit metadata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#f6f4ef",
          color: "#171614",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "26px", fontWeight: 700 }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#c9252d", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>O</div>
          OG Inspector
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#c9252d", fontSize: "18px", fontWeight: 700, letterSpacing: "3px" }}>FREE SOCIAL PREVIEW & META TAG AUDIT</div>
          <div style={{ maxWidth: "950px", display: "flex", gap: "18px", fontFamily: "Georgia, serif", fontSize: "80px", lineHeight: 1.04, letterSpacing: "-5px" }}>
            Make every link <span style={{ color: "#c9252d", fontStyle: "italic" }}>worth clicking.</span>
          </div>
        </div>
        <div style={{ color: "#6a6761", fontSize: "20px" }}>Preview your page across X, LinkedIn, Discord, and Slack.</div>
      </div>
    ),
    { ...size },
  );
}

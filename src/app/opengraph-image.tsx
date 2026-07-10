// Generate dynamic Open Graph image for Material Math
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Material Math — Free Construction Material Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF9F5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.06,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`v${i}`}
              style={{
                position: "absolute",
                left: `${(i + 1) * 100}px`,
                top: 0,
                bottom: 0,
                width: 1,
                background: "#1E3A5F",
              }}
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`h${i}`}
              style={{
                position: "absolute",
                top: `${(i + 1) * 100}px`,
                left: 0,
                right: 0,
                height: 1,
                background: "#1E3A5F",
              }}
            />
          ))}
        </div>

        {/* MM grid icon */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "rgba(30, 58, 95, 0.12)",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "rgba(30, 58, 95, 0.06)",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "rgba(30, 58, 95, 0.06)",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "rgba(30, 58, 95, 0.12)",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#1A1915",
            fontFamily: "Crimson Pro, Georgia, serif",
            letterSpacing: "-0.02em",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Material Math
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#5C5A52",
            fontFamily: "Source Sans 3, system-ui, sans-serif",
            fontWeight: 400,
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Enter your measurements. Know what to buy.
        </div>
      </div>
    ),
    { ...size }
  );
}

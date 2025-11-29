import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Headless Storefront";
  const subtitle = searchParams.get("subtitle") || "Premium Snowboarding Gear";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          border: "16px solid #2563EB",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: 48,
              background: "#2563EB",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 800,
              marginRight: "16px",
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#111827",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#4B5563",
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
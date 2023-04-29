import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

export const config = {
  runtime: "edge",
};

export const onRequest = async () => {
  return new ImageResponse(
    <div style={{ display: "flex" }}>Hello, world!</div>,
    {
      width: 1200,
      height: 630,
    }
  );
};

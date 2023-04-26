// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  console.log(req, "hi");

  if (req.method === "GET") {
    // Process a POST request
    const value = req.nextUrl.toString();
    return new Response(`Hello ${value}!`);
  } else {
    // Handle any other HTTP method
  }
  const res = await fetch(
    "https://grades-db.sultan7rs.workers.dev/api/grades/PHYS-180-L-1001-Fall-2020",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  return new Response(JSON.stringify(await res.json()));
}

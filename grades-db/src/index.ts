/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/grades") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM grades LIMIT 10"
      ).all();
      return Response.json(results);
    }

    if (pathname === "/api/courses") {
      const { results } = await env.DB.prepare(
        "SELECT DISTINCT Subject, Number, Ext FROM grades;"
      ).all();
      return Response.json(results);
    }

    if (pathname.includes("/api/sections/")) {
      const params = pathname.split("/").pop()?.split("-");
      let [subject, number, ext]: any = params;
      if (!subject || !number) {
        return Response.json(
          {
            error: "Invalid course",
          },
          { status: 400 }
        );
      }

      const queryParams = [subject, number, ext].filter(
        (param) => typeof param !== "undefined"
      );

      const { results } = await env.DB.prepare(
        "SELECT DISTINCT Section FROM grades WHERE Subject = ? AND Number = ? AND Ext " +
          (typeof ext === "undefined" ? "IS NULL" : "= ?") +
          ";"
      )
        .bind(...queryParams)
        .all();
      return Response.json(results);
    }

    if (pathname.includes("/api/terms/")) {
      const re =
        /(?<subject>\w+)-(?<number>\d+)(?:-(?<ext>\w))?-(?<section>\w+)/;

      const params = pathname.split("/").pop();

      if (!params) {
        return Response.json(
          {
            error: "Invalid course",
          },
          { status: 400 }
        );
      }

      const { subject, number, ext, section } = params.match(re)?.groups || {};

      if (!subject || !number || !section) {
        return Response.json(
          {
            error: "Invalid course",
          },
          { status: 400 }
        );
      }

      const queryParams = [subject, number, ext, section].filter(
        (param) => typeof param !== "undefined"
      );

      const { results } = await env.DB.prepare(
        "SELECT Term FROM grades WHERE Subject = ? AND Number = ? AND Ext " +
          (typeof ext === "undefined" ? "IS NULL" : "= ?") +
          " AND Section = ? " +
          ";"
      )
        .bind(...queryParams)
        .all();
      return Response.json(results);
    }

    if (pathname.includes("/api/grades/")) {
      const re =
        /(?<subject>\w+)-(?<number>\d+)(?:-(?<ext>\w))?-(?<section>\w+)-(?<season>\w+)-(?<year>\d+)/;

      const params = pathname.split("/").pop();

      if (!params) {
        return Response.json(
          {
            error: "Invalid course",
          },
          { status: 400 }
        );
      }

      const { subject, number, ext, section, season, year } =
        params.match(re)?.groups || {};

      if (!subject || !number || !section || !season || !year) {
        return Response.json(
          {
            error: "Invalid course",
          },
          { status: 400 }
        );
      }

      let queryParams = [subject, number, ext, section, season, year].filter(
        (param) => typeof param !== "undefined"
      );

      queryParams.pop(); // remove year
      queryParams.pop(); // remove season

      const term = `${season} ${year}`;

      queryParams.push(term);

      const { results } = await env.DB.prepare(
        "SELECT * FROM grades WHERE Subject = ? AND Number = ? AND Ext " +
          (typeof ext === "undefined" ? "IS NULL" : "= ?") +
          " AND Section = ? " +
          " AND Term = ? " +
          ";"
      )
        .bind(...queryParams)
        .all();
      return Response.json(results);
    }

    return new Response(
      "api is up and running, but you didn't hit any of the endpoints"
    );
  },
};

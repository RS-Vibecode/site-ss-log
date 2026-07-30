import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * URLs do WordPress antigo que o Google ainda tem indexadas (site trocou
   * para Next.js single-page em 2026-07). Sem isso, quem clica nesses
   * resultados de busca cai em 404.
   */
  async redirects() {
    return [
      { source: "/contato", destination: "/#contato", permanent: true },
      { source: "/servicos", destination: "/#servicos", permanent: true },
    ];
  },
};

export default nextConfig;

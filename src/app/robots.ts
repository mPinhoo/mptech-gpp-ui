import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Áreas autenticadas e links públicos de pedidos (dados de clientes) ficam fora da indexação. */
const PRIVATE_PATHS = [
  "/home",
  "/agenda",
  "/pedidos",
  "/pedido/",
  "/area-trabalho",
  "/produtos",
  "/clientes",
  "/estoque",
  "/precificacao",
  "/perfil",
  "/administrativo",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

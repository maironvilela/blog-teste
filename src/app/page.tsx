import PostCard from "@/components/PostCard";
import styles from "./page.module.css";
import { createClient } from "../prismicio";
import * as prismic from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

export default async function Home() {
  const client = createClient();

  // Fetch home page data (try page with UID 'home' OR a custom type named 'home')
  let home = await client.getByUID<any>("page", "home").catch(() => null);
  if (!home) {
    home = await client.getSingle<any>("home").catch(() => null);
  }

  // Fetch blog posts
  let posts: any[] = [];
  try {
    posts = await client.getAllByType<any>("blog_post", {
      orderings: [
        {
          field: "my.blog_post.date",
          direction: "desc",
        },
      ],
    });
  } catch (error) {
    console.error("Erro ao buscar posts no Prismic:", error);
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={`${styles.badge} animate-fade-in`}>Novo no Blog</span>
          <h1 className="animate-fade-in">
            {home ? (
              typeof home.data.titulo === 'string'
                ? home.data.titulo
                : prismic.asText(home.data.titulo)
            ) : (
              <>Ideias que inspiram o <span>desenvolvimento</span>.</>
            )}
          </h1>
          <p className="animate-fade-in">
            {home ? (
              typeof home.data.Texto === 'string'
                ? home.data.Texto
                : prismic.asText(home.data.Texto)
            ) : "Explore artigos, tutoriais e insights sobre as tecnologias mais recentes e as tendências de design que moldam a web."}
          </p>
          <div className={`${styles.heroActions} animate-fade-in`}>
            <button className={styles.primaryBtn}>Começar a ler</button>
            <Link href="/sobre" className={styles.secondaryBtn}>Sobre nós</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          {home?.data.imagem ? (
            <div className={styles.imageWrapper}>
              <PrismicNextImage field={home.data.imagem} className={styles.heroImage} />
            </div>
          ) : (
            <div className={styles.gradientSphere}></div>
          )}
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Artigos em Destaque</h2>
          <div className={styles.headerLine}></div>
        </div>
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={(typeof post.data.title === 'string' ? post.data.title : prismic.asText(post.data.title)) || ""}
              excerpt={post.data.excerpt as string}
              date={new Date(post.data.date as string).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              slug={post.uid}
              category={(post.data.category as string) || "Geral"}
            />
          ))}
          {posts.length === 0 && (
            <p>Nenhum artigo encontrado. Crie seu primeiro post no Prismic!</p>
          )}
        </div>
      </section>
    </div>
  );
}

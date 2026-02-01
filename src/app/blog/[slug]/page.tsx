import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "../../../prismicio";
import { components } from "../../../slices";
import styles from "./page.module.css";
import Link from "next/link";

type Params = { slug: string };

export default async function BlogPost({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const client = createClient();
    const page = await client.getByUID<any>("blog_post", slug).catch(() => notFound());

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    ← Voltar para a Home
                </Link>
                <div className={styles.meta}>
                    <span className={styles.category}>{(page.data.category as string) || "Geral"}</span>
                    <span className={styles.dot}>•</span>
                    <time className={styles.date}>
                        {new Date(page.data.date as string).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </time>
                </div>
                <h1 className={styles.title}>{(typeof page.data.title === 'string' ? page.data.title : prismic.asText(page.data.title)) || ""}</h1>
                <p className={styles.author}>Por <span>{(page.data.author as string) || "Anônimo"}</span></p>
            </header>

            <div className={styles.content}>
                <SliceZone slices={page.data.slices} components={components} />
            </div>

            <footer className={styles.postFooter}>
                <div className={styles.newsletter}>
                    <h3>Gostou do que leu?</h3>
                    <p>Inscreva-se na nossa newsletter para receber mais conteúdos premium como este.</p>
                    <div className={styles.subscribe}>
                        <input type="email" placeholder="Seu melhor e-mail" />
                        <button className="glass">Inscrever</button>
                    </div>
                </div>
            </footer>
        </article>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { slug } = await params;
    const client = createClient();
    const page = await client.getByUID<any>("blog_post", slug).catch(() => notFound());

    return {
        title: typeof page.data.title === 'string' ? page.data.title : prismic.asText(page.data.title),
        description: page.data.meta_description as string,
        openGraph: {
            title: page.data.meta_title as string,
            images: [
                {
                    url: (page.data.meta_image as any).url || "",
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    const client = createClient();
    try {
        const pages = await client.getAllByType<any>("blog_post");

        return pages.map((page: any) => {
            return { slug: page.uid };
        });
    } catch (error) {
        console.error("Erro ao buscar posts para generateStaticParams:", error);
        return [];
    }
}

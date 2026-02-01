import Link from "next/link";
import styles from "./PostCard.module.css";

interface PostCardProps {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    category: string;
}

export default function PostCard({ title, excerpt, date, slug, category }: PostCardProps) {
    return (
        <div className={`${styles.card} glass glass-hover animate-fade-in`}>
            <div className={styles.category}>{category}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.excerpt}>{excerpt}</p>
            <div className={styles.footer}>
                <span className={styles.date}>{date}</span>
                <Link href={`/blog/${slug}`} className={styles.link}>
                    Ler mais
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12L10 8L6 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

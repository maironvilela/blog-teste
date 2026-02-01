"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Blog<span>.</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/">Home</Link>
                    <Link href="/admin">Criar Post</Link>
                    <Link href="/sobre">Sobre</Link>
                </div>
            </div>
        </nav>
    );
}

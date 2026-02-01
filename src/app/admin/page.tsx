import styles from "./page.module.css";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Central de Conteúdo</h1>
                <p>Gerencie os artigos e páginas do seu blog.</p>
            </header>

            <div className={styles.grid}>
                <div className={`${styles.card} glass`}>
                    <h2>Painel Prismic</h2>
                    <p>Crie, edite e publique novos artigos diretamente no dashboard do Prismic.</p>
                    <a
                        href="https://triplay.prismic.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.button}
                    >
                        Acessar Prismic
                    </a>
                </div>

                <div className={`${styles.card} glass`}>
                    <h2>Slice Machine</h2>
                    <p>Altere a estrutura dos seus posts e crie novos blocos (Slices) localmente.</p>
                    <a
                        href="http://localhost:9999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.button}
                    >
                        Acessar Slice Machine
                    </a>
                </div>
            </div>

            <section className={styles.guide}>
                <h2>Como criar um novo post?</h2>
                <ol>
                    <li>Acesse o <strong>Prismic Dashboard</strong> através do link acima.</li>
                    <li>Vá em <strong>"Create New"</strong> e selecione <strong>"Blog Post"</strong>.</li>
                    <li>Preencha o título, data, autor e o conteúdo usando os Slices.</li>
                    <li>Clique em <strong>"Save"</strong> e depois em <strong>"Publish"</strong>.</li>
                    <li>O novo post aparecerá automaticamente na home do seu blog!</li>
                </ol>
            </section>
        </div>
    );
}

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>Blog<span>.</span></h3>
                        <p>Explorando o futuro do desenvolvimento web.</p>
                    </div>
                    <div className={styles.copyright}>
                        <p>&copy; {new Date().getFullYear()} Blog. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

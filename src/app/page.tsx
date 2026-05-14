import LandingImage from "@/components/LandingImage";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.firstScreen}>
        <main className={styles.main}>
          <LandingImage rippleOverlayClass={styles.rippleOverlay} />
        </main>
        <nav className={styles.miniNav}>
          <a className={styles.navLink} href="#footer-detail">
            misaal
          </a>
          <div className={styles.navLinksGroup}>
            <a className={styles.navLink} href="/studies">
              studies
            </a>
            <a className={styles.navLink} href="/people">
              people
            </a>
          </div>
        </nav>
      </div>
      <Footer />
    </>
  );
}

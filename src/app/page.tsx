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
      </div>
      <Footer variant="home" />
    </>
  );
}

import LandingImage from "@/components/LandingImage";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import BounceCards from "@/components/BounceCards";
import STUDIES_DATA from "@/data/studies.json";

const images: string[] = [];
const slugs: string[] = [];

STUDIES_DATA.studies.forEach((study) => {
  images.push(study.imageUrl);
  slugs.push(study.slug);
});

const transformStyles = [
  "translate(-60px) skewX(34deg) rotate(34deg)",
  "translate(0) skewX(34deg) rotate(34deg)",
  "translate(60px) skewX(34deg) rotate(34deg)",
];

export default function Home() {
  return (
    <>
      <div className={styles.firstScreen}>
        <main className={styles.main}>
          <BounceCards
            images={images}
            containerWidth={500}
            containerHeight={500}
            transformStyles={transformStyles}
            enableHover={true}
            slugs={slugs}
          />
          {/* <LandingImage rippleOverlayClass={styles.rippleOverlay} /> */}
        </main>
      </div>
      <Footer variant="home" />
    </>
  );
}

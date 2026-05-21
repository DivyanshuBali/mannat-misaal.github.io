import Link from "next/link";
import MisaalLogo from "./MisaalLogo";
import StudiesNavLink from "./StudiesNavLink";
import styles from "./Footer.module.css";

type FooterProps = {
  variant?: "home" | "page";
};

export default function Footer({ variant = "page" }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerNav}>
        {variant === "home" ? (
          <a href="#footer-detail" className={styles.navLink}>
            misaal
          </a>
        ) : (
          <Link href="/" className={styles.navLink}>
            misaal
          </Link>
        )}
        <div className={styles.navLinksGroup}>
          <StudiesNavLink className={styles.navLink}>studies</StudiesNavLink>
          <Link href="/people" className={styles.navLink}>
            people
          </Link>
        </div>
      </div>

      <div id="footer-detail" className={styles.footerContent}>
        <div className={styles.about}>
          <p className={styles.tagline}>
            a meandering speculation on Indian imagination
          </p>
          <p className={styles.description}>
            <span className={styles.thin}>misaal</span>{" "}
            <span className={styles.medium}>
              (modern indian studies on art architecture and life){" "}
            </span>
            <span className={styles.thin}>
              attempts to discover architecture from outside the discipline, in
              objects, habits and fictions. The knowledge that surfaces is
              translated into design - across scales, from the intimate to the
              inhabitable.
            </span>
          </p>
          <p className={styles.continuesAt}>
            the body of work continues at:{" "}
            <a
              href="https://mannatsingh.co"
              target="_blank"
              rel="noreferrer"
              className={styles.externalLink}
            >
              mannatsingh.co
            </a>
          </p>
        </div>

        <div className={styles.contactColumn}>
          <div className={styles.contactInfo}>
            <div>
              <p>
                1252/1 sector 43b
                <br />
                Chandigarh
              </p>
              <a href="tel:+919988111252">+91 9988111252</a>
            </div>
            <div>
              <a href="mailto:mannat@misaal.co" className={styles.email}>
                mannat@misaal.co
              </a>
              <a href="https://www.instagram.com/misaalarchive/">
                @misaalarchive
              </a>
            </div>
          </div>
          <MisaalLogo />
        </div>
      </div>
    </footer>
  );
}

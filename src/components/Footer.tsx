import MisaalLogo from "./MisaalLogo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="footer-detail" className={styles.footer}>
      <div className={styles.about}>
        <p className={styles.text}>
          a meandering speculation on Indian imagination
        </p>
        <p className={styles.subtext}>
          misaal{" "}
          <span>(modern indian studies on art architecture and life)</span>{" "}
          attempts to discover architecture from outside the discipline, in
          objects, habits and fictions. The knowledge that surfaces is
          translated into design - across scales, from the intimate to the
          inhabitable.
        </p>
        <p className={styles.subtext}>
          the body of work continues at:{" "}
          <span>
            <a rel="noreferrer" target="_blank" href="https://mannatsingh.co">
              mannatsingh.co
            </a>
          </span>
        </p>
      </div>

      <div className={styles.contactColumn}>
        <div className={styles.contactDetails}>
          <div className={styles.contactInfo}>
            <div>
              <p>
                1252/1 sector 43b <br />
                Chandigarh
              </p>
              <a href="tel:+91 9988111252">+91 9988111252</a>
            </div>

            <div>
              <a className={styles.email} href="mailto:info@misaal.in">
                mannat@misaal.co
              </a>
              <br />
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

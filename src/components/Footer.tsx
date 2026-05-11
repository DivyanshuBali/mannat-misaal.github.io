export default function Footer() {
  return (
    <footer>
      <div className="footer-about">
        <h4 className="footer-title">misaal</h4>
        <p className="footer-text">
          a meandering speculation on Indian imagination
        </p>
        <p className="footer-subtext">
          misaal{" "}
          <span>(modern indian studies on art architecture and life)</span>{" "}
          attempts to discover architecture from outside the discipline, in
          objects, habits and fictions. The knowledge that surfaces is translated
          into design - across scales, from the intimate to the inhabitable.
        </p>
        <p className="footer-subtext">
          The body of work continues at:{" "}
          <span>
            <a
              className="footer-link"
              rel="noreferrer"
              target="_blank"
              href="https://mannatsingh.co"
            >
              mannatsingh.co
            </a>
          </span>
        </p>
      </div>

      <div className="footer-contact">
        <div className="footer-contact-info">
          <div>
            <p>
              1252/1 sector 43b <br />
              Chandigarh
            </p>
            <a href="tel:+91 9988111252">+91 9988111252</a>
          </div>

          <div>
            <a className="footer-email" href="mailto:info@misaal.in">
              mannat@misaal.co
            </a>
            <br />
            <a href="https://www.instagram.com/misaalarchive/">
              @misaalarchive
            </a>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/misaal-logo.svg" alt="misaal logo" />
      </div>
    </footer>
  );
}

import Footer from "@/components/Footer";
import PEOPLE_DATA from "./data.json";
import PeopleDesktop from "./PeopleDesktop";
import PeopleMobile from "./PeopleMobile";
import styles from "./page.module.css";

export default function PeoplePage() {
  return (
    <div className={styles.peopleRoot}>
      <main className={styles.main}>
        <section className={styles.peopleSection} aria-label="People">
          <PeopleDesktop people={PEOPLE_DATA.people} />
          <PeopleMobile people={PEOPLE_DATA.people} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

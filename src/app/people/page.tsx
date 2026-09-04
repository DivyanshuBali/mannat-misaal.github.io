import NavBar from "../components/NavBar";
import styles from "./page.module.css";

const leftColumn = [
  { name: "mannat singh", role: "ARCHITECT/FOUNDER" },
  { name: "eknoor matharoo", role: "ASSOCIATE" },
];

const rightColumn = [
  { name: "shikhar saikia", role: "ASSOCIATE" },
  { name: "divyanshu bali", role: "ASSOCIATE" },
];

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div className={styles.person}>
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{role}</p>
    </div>
  );
}

export default function PeoplePage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="People">
        <div className={styles.people}>
          <div className={styles.leftColumn}>
            {leftColumn.map((person) => (
              <Person key={person.name} {...person} />
            ))}
          </div>
          <div className={styles.rightColumn}>
            {rightColumn.map((person) => (
              <Person key={person.name} {...person} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.navContainer}>
        <NavBar />
      </section>
    </main>
  );
}

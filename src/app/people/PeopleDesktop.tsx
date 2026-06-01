import PersonCard from "./PersonCard";
import PersonInfo from "./PersonInfo";
import type { Person } from "./types";
import styles from "./PeopleDesktop.module.css";

type PeopleDesktopProps = {
  people: Person[];
};

export default function PeopleDesktop({ people }: PeopleDesktopProps) {
  return (
    <div className={styles.desktopLayout}>
      <div className={styles.desktopCarousel}>
        {people.map((person, index) => (
          <div
            key={person.name}
            className={styles.personCardWrap}
            data-person-index={index}
          >
            <PersonCard person={person} />
          </div>
        ))}
      </div>
      <div className={styles.desktopInfoWrap}>
        <div className={styles.desktopInfoBox}>
          {people.map((person, index) => (
            <div
              key={person.name}
              className={styles.desktopInfoPanel}
              data-person-index={index}
            >
              <PersonInfo person={person} contentOnly />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

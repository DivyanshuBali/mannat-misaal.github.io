import type { Person } from "./types";
import styles from "./PersonCard.module.css";

type PersonCardProps = {
  person: Person;
};

export default function PersonCard({ person }: PersonCardProps) {
  const isPlaceholder = !person.imageUrl;

  return (
    <div
      className={styles.personCard}
      style={{ width: `${person.imageWidth}px` }}
    >
      {isPlaceholder ? (
        <span className={styles.personPlaceholder} aria-hidden />
      ) : (
        <img
          src={person.imageUrl}
          alt=""
          className={styles.personImage}
          draggable={false}
        />
      )}
    </div>
  );
}

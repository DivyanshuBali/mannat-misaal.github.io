import type { Person } from "./types";
import styles from "./PersonInfo.module.css";

type PersonInfoProps = {
  person: Person;
  contentOnly?: boolean;
};

export default function PersonInfo({
  person,
  contentOnly = false,
}: PersonInfoProps) {
  const content = (
    <>
      <p className={styles.infoName}>{person.name}</p>
      <p className={styles.infoDesignation}>{person.designation}</p>
      <p className={styles.infoStudies}>{person.associatedStudies}</p>
    </>
  );

  if (contentOnly) {
    return content;
  }

  return <div className={styles.infoBox}>{content}</div>;
}

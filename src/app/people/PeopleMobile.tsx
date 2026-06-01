import PeopleMobileCarousel from "./PeopleMobileCarousel";
import type { Person } from "./types";

type PeopleMobileProps = {
  people: Person[];
};

export default function PeopleMobile({ people }: PeopleMobileProps) {
  return <PeopleMobileCarousel people={people} />;
}

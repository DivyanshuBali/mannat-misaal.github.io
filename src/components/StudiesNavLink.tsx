"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const STUDIES_HIGHLIGHT_EVENT = "highlight-studies";
export const STUDIES_HIGHLIGHT_PARAM = "studies";

type StudiesNavLinkProps = {
  className?: string;
  children: React.ReactNode;
};

export default function StudiesNavLink({
  className,
  children,
}: StudiesNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent(STUDIES_HIGHLIGHT_EVENT));
      return;
    }

    router.push(`/?highlight=${STUDIES_HIGHLIGHT_PARAM}`);
  };

  return (
    <Link
      href={`/?highlight=${STUDIES_HIGHLIGHT_PARAM}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

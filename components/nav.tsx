"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const SECTION_DATA = [
  { label: "Home", href: "/", x: "100%" },
  { label: "Encrypt", href: "/encrypt", x: "38%" },
  { label: "Decrypt", href: "/decrypt", x: "0%" },
  { label: "Profile", href: "/profile", x: "0%" },
  {
    label: "GitHub",
    href: "https://github.com/lucky-chap/1hash",
    x: "0%",
  },
];

export default function Nav() {
  const pathname = usePathname();
  const activeSection = SECTION_DATA.find(
    (section) => section.href === pathname
  );

  const buttons = SECTION_DATA.map((section) => {
    return (
      <Link href={section.href} className="nav-link" key={section.label}>
        <div
          style={{ position: "relative", zIndex: 2 }}
          className={`${pathname === section.href && "text-gray-950"}`}
        >
          {section.label}
        </div>
        {pathname === section.href ? (
          <>
            <motion.div
              aria-hidden
              className="nav-glow"
              layoutId="glow"
              transition={{
                delay: 0.03,
                type: "spring",
                stiffness: 125,
                damping: 20,
                mass: 1,
              }}
              style={{ scale: 2, opacity: 0.2, rotate: 0.00001 }}
            />
            <motion.div
              aria-hidden
              className="nav-pill"
              layoutId="pill"
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 1,
              }}
            />
          </>
        ) : null}
      </Link>
    );
  });

  return (
    <>
      <nav
        style={
          activeSection
            ? {
                ["--x" as string]: activeSection.x,
              }
            : undefined
        }
      >
        <div aria-hidden className="nav-stroke" />
        <div className="nav-switcher">{buttons}</div>
      </nav>
    </>
  );
}

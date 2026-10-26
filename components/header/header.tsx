import Link from "next/link";
import { headerConfig } from "@/configs/header.config";

export const Header = () => {
  return (
    <header
      className="fixed z-70 flex items-center w-full h-(--header-height) bg-(--background)"
      aria-label="Header"
    >
      <nav className="layout-container flex justify-between w-full">
        <ul className="flex gap-6">
          {headerConfig.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                className="text-sm font-(family-name:--font-geist-mono) font-medium"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div></div>
      </nav>
    </header>
  );
};

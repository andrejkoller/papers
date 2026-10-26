import Link from "next/link";
import { headerConfig } from "@/configs/header.config";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Tooltip } from "@/components/tooltip";

export const Header = () => {
  return (
    <header
      className="fixed z-70 flex items-center w-full h-(--header-height) bg-(--background)"
      aria-label="Header"
    >
      <nav className="layout-container flex justify-between w-full">
        {/* List of links */}
        <ul className="flex items-center gap-4">
          {headerConfig.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                className="text-sm font-medium"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme switcher */}
        <Tooltip content="Toggle theme (Shift + D)" side="bottom">
          <ThemeSwitcher />
        </Tooltip>
      </nav>
    </header>
  );
};

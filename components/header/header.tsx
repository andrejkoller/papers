import Link from "next/link";
import { headerConfig } from "@/configs/header.config";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Tooltip } from "@/components/tooltip";

export const Header = () => {
  return (
    <header className="w-full bg-(--background)" aria-label="Header">
      <div className="flex h-(--header-height) w-full items-center justify-center border-b border-(--border)">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center justify-center"
        >
          {/* SVG Logo */}
          <span className="text-sm font-medium tracking-wide">
            {/* Placeholder - replace with SVG logo later */}
          </span>
        </Link>
      </div>

      {/* Subheader: Links, Theme switcher */}
      <nav
        className="flex h-(--subheader-height) w-full items-center"
        aria-label="Primary"
      >
        <div className="layout-container flex h-full w-full items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <ul className="flex items-center gap-6">
              {headerConfig.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    className="font-bold font-(family-name:--font-geist-mono) underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Tooltip content="Toggle theme (Shift + D)" side="bottom">
              <ThemeSwitcher />
            </Tooltip>
          </div>
        </div>
      </nav>
    </header>
  );
};

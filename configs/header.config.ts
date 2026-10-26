export interface HeaderLink {
  key: string;
  title?: string;
  href: string;
}

export const headerConfig: HeaderLink[] = [
  {
    key: "papers",
    title: "Papers",
    href: "/papers",
  },
  {
    key: "resources",
    title: "Resources",
    href: "/resources",
  },
  {
    key: "essays",
    title: "Essays",
    href: "/essays",
  },
  {
    key: "bibliography",
    title: "Bibliography",
    href: "/bibliography",
  },
];

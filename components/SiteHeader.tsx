import Link from "next/link";
import { navItems, profile } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 mx-auto flex h-[88px] max-w-[1040px] items-center justify-between bg-canvas/[.88] px-7 backdrop-blur-[14px] max-sm:h-[76px] max-sm:px-5">
      <Link
        href="/"
        className="group flex items-center gap-[11px] text-[0.8rem] font-semibold uppercase"
        aria-label={`${profile.name} home`}
      >
        <span
          className="inline-flex size-7 items-center justify-center border border-text transition-[background-color,color,transform] duration-[180ms] group-hover:bg-text group-hover:text-canvas group-hover:-rotate-[7deg]"
          aria-hidden="true"
        >
          M
        </span>
        <span className="max-sm:hidden">{profile.name}</span>
      </Link>

      <nav
        className="flex items-center gap-7 max-sm:gap-[17px]"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-dim text-[0.76rem] transition-colors hover:text-text max-sm:text-[0.66rem]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

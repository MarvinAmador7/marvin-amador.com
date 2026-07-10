import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex min-h-[130px] max-w-[1040px] items-center justify-between border-t border-line px-7 text-[0.68rem] text-quiet uppercase max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:px-5 max-sm:py-7">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <div className="flex items-center gap-6 max-sm:mt-3">
        <a href={profile.github} className="text-dim text-[0.76rem] transition-colors hover:text-text">
          GitHub
        </a>
        <a href={profile.linkedin} className="text-dim text-[0.76rem] transition-colors hover:text-text">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className="text-dim text-[0.76rem] transition-colors hover:text-text">
          Email
        </a>
      </div>
    </footer>
  );
}

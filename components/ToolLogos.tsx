import type { ComponentType } from "react";

type LogoProps = { size?: number };

/**
 * The Pi (pi.dev) logo mark, inlined so it inherits the site's color tokens
 * via currentColor instead of the upstream SVG's prefers-color-scheme fill.
 * Paths sourced from https://pi.dev/logo-auto.svg.
 */
function PiLogo({ size = 20 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M165.29 165.29 H517.36 V400 H400 V517.36 H282.65 V634.72 H165.29 Z M282.65 282.65 V400 H400 V282.65 Z"
      />
      <path d="M517.36 400 H634.72 V634.72 H517.36 Z" />
    </svg>
  );
}

/**
 * The Smithers (smithers.sh) logo glyph, extracted from the wordmark at
 * smithers.sh and recolored to currentColor for the same reason as PiLogo.
 */
function SmithersLogo({ size = 20 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7.86 9.58 42.26 26.78 39.22 28.3 4.81 11.1Z M8.78 19.7 43.19 36.9 40.14 38.42 5.74 21.22Z" />
    </svg>
  );
}

export type ToolLogoKind = "pi" | "smithers";

export const toolLogos: Record<
  ToolLogoKind,
  { Logo: ComponentType<LogoProps>; href: string; label: string }
> = {
  pi: { Logo: PiLogo, href: "https://pi.dev/", label: "Pi, the coding agent library" },
  smithers: {
    Logo: SmithersLogo,
    href: "https://smithers.sh/",
    label: "Smithers, the durable workflow orchestrator",
  },
};

import { Project } from "@/lib/content";
import { FunnelLoopsIsoStack } from "@/components/FunnelLoopsIsoStack";
import { IsometricStack } from "@/components/IsometricStack";

const isoStacks = {
  "grivara-ops": IsometricStack,
  funnelloops: FunnelLoopsIsoStack,
} as const;

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const Icon = project.icon;
  const IsoStack = compact ? undefined : isoStacks[project.slug as keyof typeof isoStacks];
  const useIso = Boolean(IsoStack);

  return (
    <figure
      className={`relative m-0 overflow-hidden border border-line bg-surface text-text max-[840px]:max-w-[520px] max-[640px]:h-[420px] max-[640px]:w-full ${
        useIso ? "h-auto project-visual--iso" : "h-[440px]"
      }`}
      aria-label={`${project.title} project signals`}
    >
      <div
        className={
          useIso
            ? "hidden"
            : "absolute inset-0 bg-[length:32px_32px] bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] opacity-30"
        }
      />
      <figcaption className="relative flex justify-between p-[18px] text-[0.62rem] uppercase text-quiet">
        <span>System / {project.slug}</span>
        <span>{project.year}</span>
      </figcaption>
      <div
        className={
          useIso
            ? "relative flex h-auto flex-col items-center justify-center gap-[18px] px-[18px] pb-5 pt-1.5"
            : "relative flex h-[230px] flex-col items-center justify-center gap-[18px]"
        }
      >
        {IsoStack ? (
          <div className="flex w-full flex-col items-stretch gap-3">
            <IsoStack />
            <span className="text-center text-[0.66rem] uppercase tracking-[0.16em] text-dim">{project.eyebrow}</span>
          </div>
        ) : (
          <>
            <Icon className="text-primary" size={compact ? 32 : 48} strokeWidth={1.25} />
            <span className="text-[0.7rem] uppercase text-dim">{project.eyebrow}</span>
          </>
        )}
      </div>
      <div className="relative border-t border-line">
        {project.metrics.map((metric, index) => (
          <span key={metric} className="grid grid-cols-[26px_1fr] gap-3 border-b border-line px-4 py-[10px] text-[0.68rem] uppercase">
            <small className="text-quiet text-[0.68rem]">{String(index + 1).padStart(2, "0")}</small>
            {metric}
          </span>
        ))}
      </div>
    </figure>
  );
}

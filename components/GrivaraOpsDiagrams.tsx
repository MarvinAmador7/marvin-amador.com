import {
  AgentBoundaryVisual,
  DispatchFunnelVisual,
  ExtensionStackVisual,
  OfflineReplayVisual,
  TenantBoundaryVisual,
  WorkflowKernelVisual,
} from "@/components/GrivaraOpsIsoVisuals";

const wrapClass = "min-h-[280px] bg-none px-3 pb-0 pt-2 max-[640px]:min-h-0 max-[640px]:px-3.5 max-[640px]:py-5";
const captionClass = "mt-[22px] text-center text-[0.6rem] leading-[1.55] text-quiet";

export function TenantBoundary() {
  return (
    <div className={wrapClass}>
      <TenantBoundaryVisual />
      <p className={captionClass}>
        The trusted organization scope arrives from the session, not the browser: procedures receive it as an explicit argument, so unsafe access is structurally impossible.
      </p>
    </div>
  );
}

export function ExtensionStack() {
  return (
    <div className={wrapClass}>
      <ExtensionStackVisual />
      <p className={captionClass}>
        The model proposes and the platform decides: drafts are validated, versioned, and published through governance before they can change the live business.
      </p>
    </div>
  );
}

export function WorkflowKernel() {
  return (
    <div className={wrapClass}>
      <WorkflowKernelVisual />
      <p className={captionClass}>
        Postgres owns workflow truth; Trigger.dev and leased workers only deliver effects. A worker can retry or disappear and the run is still recoverable.
      </p>
    </div>
  );
}

export function DispatchFunnel() {
  return (
    <div className={wrapClass}>
      <DispatchFunnelVisual />
      <p className={captionClass}>
        Qualification is a hard gate, not a score: proximity can never outrank competence. The result is a short, explainable list the dispatcher acts on.
      </p>
    </div>
  );
}

export function AgentBoundary() {
  return (
    <div className={wrapClass}>
      <AgentBoundaryVisual />
      <p className={captionClass}>
        Models and runtimes are replaceable; the capability boundary is not. Every tool call is typed, permission-checked, allowlisted, and limited before it runs.
      </p>
    </div>
  );
}

export function OfflineReplay() {
  return (
    <div className={wrapClass}>
      <OfflineReplayVisual />
      <p className={captionClass}>
        The same architecture that governs agents governs humans on bad networks: intent is durable, execution is bounded, and the final state is the server&apos;s.
      </p>
    </div>
  );
}

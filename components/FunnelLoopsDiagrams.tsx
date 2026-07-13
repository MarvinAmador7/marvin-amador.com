import { FunnelSpecVisual } from "@/components/FunnelSpecVisual";
import {
  ArtifactSyncVisual,
  BenchmarkHarnessVisual,
  EventPipelineVisual,
  IntegrationOutboxVisual,
  SkillRuntimeVisual,
  ValidationGateVisual,
} from "@/components/FunnelLoopsIsoVisuals";

const wrapClass = "min-h-[280px] bg-none px-3 pb-0 pt-2 max-[640px]:min-h-0 max-[640px]:px-3.5 max-[640px]:py-5";
const captionClass = "mt-[22px] text-center text-[0.6rem] leading-[1.55] text-quiet";

export function FunnelSpec() {
  return (
    <div className={wrapClass}>
      <FunnelSpecVisual />
      <p className={captionClass}>
        Routing is one discriminated union inline on each step: linear · conditional · split-test · multi-path.
      </p>
    </div>
  );
}

export function SkillRuntime() {
  return (
    <div className={wrapClass}>
      <SkillRuntimeVisual />
      <p className={captionClass}>
        Hydration mounts the skills and funnel.json before the agent wakes; credentials and the business network do not exist inside the VM.
      </p>
    </div>
  );
}

export function ValidationGate() {
  return (
    <div className={wrapClass}>
      <ValidationGateVisual />
      <p className={captionClass}>
        Six properties every funnel must hold: a terminal step exists · every target resolves · no cycles · no unreachable steps · split weights sum to 100 · conditionals declare a fallback.
      </p>
    </div>
  );
}

export function ArtifactSync() {
  return (
    <div className={wrapClass}>
      <ArtifactSyncVisual />
      <p className={captionClass}>
        Four host commands are the only exits from the VM: sync · publish · analytics · load.
      </p>
    </div>
  );
}

export function IntegrationOutbox() {
  return (
    <div className={wrapClass}>
      <IntegrationOutboxVisual />
      <p className={captionClass}>
        Contract tests hold every connector to one suite; the next connector is declarative config plus thin overrides.
      </p>
    </div>
  );
}

export function EventPipeline() {
  return (
    <div className={wrapClass}>
      <EventPipelineVisual />
      <p className={captionClass}>
        Routing decisions are recorded events: the runtime logs which branch fired and why. Ground truth, not inference.
      </p>
    </div>
  );
}

export function BenchmarkHarness() {
  return (
    <div className={wrapClass}>
      <BenchmarkHarnessVisual />
      <p className={captionClass}>
        Verifiers are programmatic, not model-graded; models swap via the gateway for comparison runs.
      </p>
    </div>
  );
}

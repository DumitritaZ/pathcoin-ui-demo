import { Suspense } from "react";
import ClientRun from "./ClientRun";

// oprește pre-renderul static pentru această pagină
export const dynamic = "force-dynamic";

export default function RunPage() {
  return (
    <Suspense fallback={<div className="mobile px-6 py-6 text-white/70">Loading…</div>}>
      <ClientRun />
    </Suspense>
  );
}

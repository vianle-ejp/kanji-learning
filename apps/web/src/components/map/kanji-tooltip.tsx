import React from "react";

import type { TooltipPayload } from "@/lib/types";

interface KanjiTooltipProps {
  tooltip: TooltipPayload | null;
  visible: boolean;
}

export function KanjiTooltip({ tooltip, visible }: KanjiTooltipProps) {
  if (!visible || tooltip == null) {
    return null;
  }

  return (
    <div
      role="status"
      className="absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-moss/20 bg-white/95 p-4 text-left shadow-lg shadow-ink/10"
    >
      <h3 className="text-lg font-semibold text-ink">{tooltip.label}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/80">{tooltip.shortMeaning}</p>
      {tooltip.hiragana ? <p className="mt-2 text-sm text-moss">{tooltip.hiragana}</p> : null}
      {tooltip.hanViet ? <p className="text-sm text-persimmon">{tooltip.hanViet}</p> : null}
    </div>
  );
}

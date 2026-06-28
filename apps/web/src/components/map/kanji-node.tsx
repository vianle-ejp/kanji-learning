"use client";

import React, { useState } from "react";

import { KanjiTooltip } from "@/components/map/kanji-tooltip";
import type { GraphNode } from "@/lib/types";

interface KanjiNodeProps {
  node: GraphNode;
}

export function KanjiNode({ node }: KanjiNodeProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <button
        type="button"
        className="min-w-20 rounded-full border border-moss/25 bg-white px-4 py-3 text-base font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-moss/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persimmon"
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        aria-label={node.label}
      >
        {node.label}
      </button>
      <KanjiTooltip tooltip={node.tooltip} visible={isTooltipVisible} />
    </div>
  );
}

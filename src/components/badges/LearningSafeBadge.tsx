import { Badge } from "@/components/ui/Badge";
import { learningSafeTokens } from "@/styles/tokens";
import type { LearningSafeMode } from "@/types/workflow";

type LearningSafeBadgeProps = {
  mode: LearningSafeMode;
};

export function LearningSafeBadge({ mode }: LearningSafeBadgeProps) {
  const token = learningSafeTokens[mode];

  return <Badge className={token.className}>{token.label}</Badge>;
}

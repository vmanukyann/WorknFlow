import { Badge } from "@/components/ui/Badge";
import { freshnessTokens } from "@/styles/tokens";
import type { FreshnessStatus } from "@/types/workflow";

type FreshnessBadgeProps = {
  status: FreshnessStatus;
};

export function FreshnessBadge({ status }: FreshnessBadgeProps) {
  const token = freshnessTokens[status];

  return <Badge className={token.className}>{token.label}</Badge>;
}

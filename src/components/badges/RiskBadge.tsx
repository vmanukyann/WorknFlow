import { Badge } from "@/components/ui/Badge";
import { categoryRiskTokens } from "@/styles/tokens";
import type { CategoryRisk } from "@/types/workflow";

type RiskBadgeProps = {
  risk: CategoryRisk;
};

export function RiskBadge({ risk }: RiskBadgeProps) {
  const token = categoryRiskTokens[risk];

  return <Badge className={token.className}>{token.label}</Badge>;
}

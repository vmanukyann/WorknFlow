import { Badge } from "@/components/ui/Badge";
import { difficultyTokens } from "@/styles/tokens";
import type { Difficulty } from "@/types/workflow";

type DifficultyBadgeProps = {
  difficulty: Difficulty;
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const token = difficultyTokens[difficulty];

  return <Badge className={token.className}>{token.label}</Badge>;
}

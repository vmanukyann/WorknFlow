import { Badge } from "@/components/ui/Badge";

type PlatformBadgeProps = {
  platform: string;
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return <Badge tone="accent">Tested on {platform}</Badge>;
}

import { Badge } from "@/components/ui/badge/badge";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { cn } from "@/lib/utils/cn/cn";

type ExpertStatusBadgesProps = {
  isVerified?: boolean;
  isActive?: boolean;
  className?: string;
};

export function ExpertStatusBadges({
  isVerified,
  isActive,
  className,
}: ExpertStatusBadgesProps) {
  if (!isVerified && !isActive) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {isVerified ? (
        <li>
          <Badge variant="success">{expertProfileCopy.verifiedLabel}</Badge>
        </li>
      ) : null}
      {isActive ? (
        <li>
          <Badge variant="outline">{expertProfileCopy.activeLabel}</Badge>
        </li>
      ) : null}
    </ul>
  );
}

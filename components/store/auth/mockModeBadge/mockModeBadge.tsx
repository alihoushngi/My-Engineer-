import { Badge } from "@/components/ui/badge/badge";
import { authUiCopy } from "@/config/auth-ui.config/auth-ui.config";

type MockModeBadgeProps = {
  visible: boolean;
};

export function MockModeBadge({ visible }: MockModeBadgeProps) {
  if (!visible) {
    return null;
  }

  return (
    <Badge variant="warning" className="font-normal">
      {authUiCopy.mockModeLabel}
    </Badge>
  );
}

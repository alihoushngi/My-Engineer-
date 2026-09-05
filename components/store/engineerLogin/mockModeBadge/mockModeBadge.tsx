import { Badge } from "@/components/ui/badge/badge";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

type MockModeBadgeProps = {
  visible: boolean;
};

export function MockModeBadge({ visible }: MockModeBadgeProps) {
  if (!visible) {
    return null;
  }

  return (
    <Badge variant="warning" className="font-normal">
      {engineerPanelCopy.mockModeLabel}
    </Badge>
  );
}

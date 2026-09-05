import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";

type ConversationAvatarProps = {
  name: string;
  src?: string;
};

export function ConversationAvatar({ name, src }: ConversationAvatarProps) {
  return (
    <Avatar size="sm" className="mt-0.5">
      {src ? <AvatarImage src={src} alt="" /> : null}
      <AvatarFallback>{getDisplayInitials(name)}</AvatarFallback>
    </Avatar>
  );
}

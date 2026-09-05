import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { RegistrationCompleteView } from "@/components/store/registration/registrationComplete/registrationCompleteView";

export async function RegistrationComplete() {
  const session = await getEngineerSession();

  return <RegistrationCompleteView redirectToPanel={Boolean(session)} />;
}

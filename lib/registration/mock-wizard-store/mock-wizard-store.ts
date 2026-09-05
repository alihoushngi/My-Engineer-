import {
  type RegistrationMaxStep,
  type RegistrationWizardData,
} from "@/types/store/registration.types";
import {
  readMockRegistrationWizard,
  writeMockRegistrationWizard,
  type PersistedRegistrationWizard,
} from "@/lib/registration/mock-wizard-storage/mock-wizard-storage";

const EMPTY_WIZARD: PersistedRegistrationWizard = {
  data: {},
  maxStep: 1,
};

let current: PersistedRegistrationWizard = EMPTY_WIZARD;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function getWizardSnapshot(): PersistedRegistrationWizard {
  return current;
}

export function getServerWizardSnapshot(): PersistedRegistrationWizard {
  return EMPTY_WIZARD;
}

export function subscribeWizard(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function hydrateWizardFromStorage(): void {
  const stored = readMockRegistrationWizard();

  if (!stored) {
    return;
  }

  current = stored;
  emit();
}

export function setWizardState(
  next: PersistedRegistrationWizard,
  persist: boolean,
): void {
  current = next;

  if (persist) {
    writeMockRegistrationWizard(next);
  }

  emit();
}

export function resetWizardStore(): void {
  current = EMPTY_WIZARD;
  emit();
}

export function patchWizardState(
  persist: boolean,
  updater: (prev: PersistedRegistrationWizard) => PersistedRegistrationWizard,
): void {
  setWizardState(updater(current), persist);
}

export type { RegistrationMaxStep, RegistrationWizardData };

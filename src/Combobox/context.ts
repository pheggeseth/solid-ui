import { createContext, useContext } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

export type ComboboxState = DeepReadonly<{
  textboxId: string | null;
  dropdownId: string | null;
  listboxId: string | null;
  textboxValue: string;
  options: string[];
  filteredOptions: string[];
  selection: 'manual' | 'automatic' | 'inline-automatic';
}>;

export type ComboboxActions = Readonly<{
  onTextboxMount(textboxId: string): void;
  onTextboxFocus(event: FocusEvent): void;
  onTextboxBlur(event: FocusEvent): void;
  onTextboxInput(value: string): void;
  onTextboxClear(): void;
  onDropdownMount(dropdownId: string): void;
  onDropdownOpen(): void;
  onListboxMount(listboxId: string): void;
  onListboxCleanup(): void;
}>;

export const ComboboxContext = createContext<[state: ComboboxState, actions: ComboboxActions]>();

export function useComboboxContext() {
  return useContext(ComboboxContext);
}

export function useComboboxState() {
  return useComboboxContext()[0];
}

export function useComboboxActions() {
  return useComboboxContext()[1];
}

import { atom } from "nanostores";

export const selectedItems = atom<string[]>([]);
export const tempSelectedItems = atom<string[]>([]);
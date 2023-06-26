import { toBase58 } from "@/lib/utils";
import { ID_LENGTH } from "./constants";

export function generateId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  return toBase58(bytes);
}
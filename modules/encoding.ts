/**
 * In order to facilitate effortless document sharing, we combine the identification code,
 * housing the data within Redis, with the confidential encryption key.
 */

import { fromBase58, toBase58 } from "@/lib/utils";
import { ID_LENGTH, ENCRYPTION_KEY_LENGTH } from "./constants";
export function encodeCompositeKey(version: number, id: string, encryptionKey: Uint8Array): string {
  if (version < 0 || version > 255) {
    throw new Error("The version must be encapsulated within a single byte.");
  }
  const compositeKey = new Uint8Array([version, ...fromBase58(id), ...encryptionKey]);

  return toBase58(compositeKey);
}


export function decodeCompositeKey(compositeKey: string): { id: string; encryptionKey: Uint8Array; version: number } {
  const decoded = fromBase58(compositeKey);
  const version = decoded.at(0);

  if (version === 1 || version === 2) {
    return {
      id: toBase58(decoded.slice(1, 1 + ID_LENGTH)),
      encryptionKey: decoded.slice(1 + ID_LENGTH, 1 + ID_LENGTH + ENCRYPTION_KEY_LENGTH),
      version,
    };
  }

  throw new Error(`Incompatible composite key version: ${version}`);
}
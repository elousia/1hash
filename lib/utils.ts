import baseX from "base-x";

const format = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export const toBase58 = (b: Uint8Array) => baseX(format).encode(b);

export const fromBase58 = (s: string) => baseX(format).decode(s);
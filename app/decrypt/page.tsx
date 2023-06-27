"use client";

import { useEffect, useState } from "react";

import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { Fragment } from "react";
import { decodeCompositeKey } from "@/modules/encoding";
import { decrypt } from "@/modules/encryption";
import { errorToast } from "@/components/toasts";
import Link from "next/link";

export default function Decrypt() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [compositeKey, setCompositeKey] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCompositeKey(window.location.hash.replace(/^#/, ""));
    }
  }, []);
  const [remainingReads, setRemainingReads] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async () => {
    try {
      setError(null);
      setText(null);
      setLoading(true);

      if (!compositeKey) {
        errorToast("No ID provided");
      }

      const { id, encryptionKey, version } = decodeCompositeKey(compositeKey);
      const res = await fetch(`/api/v1/load?id=${id}`);
      if (!res.ok) {
        errorToast(await res.text());
        throw new Error(await res.text());
      }
      const json = (await res.json()) as {
        iv: string;
        encrypted: string;
        remainingReads: number | null;
      };
      setRemainingReads(json.remainingReads);

      const decrypted = await decrypt(
        json.encrypted,
        encryptionKey,
        json.iv,
        version
      );

      setText(decrypted);
    } catch (e) {
      console.error(e);
      errorToast((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center max-w-4xl justify-start mx-auto w-full sm:min-h-screen sm:px-0">
      <div className="text-center mt-10 w-full">
        <h2 className="py-4 text-5xl w-full font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-5xl">
          Decrypt
        </h2>
        {text ? (
          <>
            <pre className="px-4 py-3 mt-8 overflow-x-scroll font-mono w-full text-left bg-transparent border rounded border-zinc-400 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
              <div className="flex items-start px-1 text-sm w-full">
                <div
                  aria-hidden="true"
                  className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700"
                >
                  {Array.from({
                    length: text?.split("\n").length as number,
                  }).map((_, index) => (
                    <Fragment key={index}>
                      {(index + 1).toString().padStart(2, "0")}
                      <br />
                    </Fragment>
                  ))}
                </div>
                <div>
                  <pre className="flex overflow-x-auto">
                    <code className="px-4 text-left overflow-x-scroll text-gray-600">
                      {text}
                    </code>
                  </pre>
                </div>
              </div>
            </pre>

            <div className="mx-auto text-xs mt-8">
              <p>
                Remaining reads: <span>{remainingReads}</span>
              </p>
            </div>

            <div className="my-7 w-full flex justify-center items-center">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2300);
                }}
              >
                <span className="flex items-center cursor-pointer">
                  {copied ? (
                    <Icons.copyDone className="h-4" aria-hidden="true" />
                  ) : (
                    <Icons.copy className="h-4" aria-hidden="true" />
                  )}

                  {copied ? "Copied" : "Copy"}
                </span>
              </Button>

              <Link href={"/encrypt"} className="ml-1">
                <Button>
                  <Icons.key className="mr-2 h-4 w-4" />
                  Encrypt
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <form
            className="max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="px-3 py-2 mt-8 border rounded border-zinc-600 focus-within:ring-0">
              <label
                htmlFor="id"
                className="block text-xs font-medium text-left text-zinc-500"
              >
                ID
              </label>
              <input
                type="text"
                name="compositeKey"
                id="compositeKey"
                placeholder="lksdfjkasjdjDLKJKDJp343"
                className="w-full p-0 text-base focus:outline-0 bg-transparent border-0 appearance-none text-zinc-600 placeholder-zinc-400 focus:ring-0 sm:text-sm"
                value={compositeKey}
                onChange={(e) => setCompositeKey(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <Button
                type="submit"
                classes={`w-1/2 mx-auto flex items-center text-center justify-center ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Icons.spinner className="w-5 h-5 mr-1 animate-spin" />
                    Decrypting
                  </>
                ) : (
                  <>
                    <Icons.unlock className="w-4 h-4 mr-1" />
                    Decrypt
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

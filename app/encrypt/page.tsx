"use client";

import { useState } from "react";
import { toBase58 } from "@/lib/utils";
import { encrypt } from "@/modules/encryption";
import { encodeCompositeKey } from "@/modules/encoding";
import { LATEST_KEY_VERSION } from "@/modules/constants";

import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { Fragment } from "react";
import Select from "@/components/select";
import { errorToast, successToast } from "@/components/toasts";

export default function Encrypt() {
  const [text, setText] = useState(
    "DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
  );
  const [reads, setReads] = useState(999);

  const [ttl, setTtl] = useState(7);
  const [ttlMultiplier, setTtlMultiplier] = useState(60 * 60 * 24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [link, setLink] = useState("");

  const onSubmit = async () => {
    try {
      setError("");
      setLink("");
      setLoading(true);

      const { encrypted, iv, key } = await encrypt(text);

      const { id } = (await fetch("/api/v1/store", {
        method: "POST",
        body: JSON.stringify({
          ttl: ttl * ttlMultiplier,
          reads,
          encrypted: toBase58(encrypted),
          iv: toBase58(iv),
        }),
      }).then((r) => r.json())) as { id: string };

      const compositeKey = encodeCompositeKey(LATEST_KEY_VERSION, id, key);

      const url = new URL(window.location.href);
      url.pathname = "/unseal";
      url.hash = compositeKey;
      setCopied(false);
      setLink(url.toString());
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error ? errorToast(error) : null}
      <section className="flex flex-col items-center max-w-4xl justify-start mx-auto w-full sm:min-h-screen sm:px-0">
        <div className="text-center mt-10 w-full">
          <h2 className="py-4 text-5xl w-full font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-5xl">
            Encrypt
          </h2>
          <pre className="px-4 py-3 mt-8 font-mono w-full text-left bg-transparent border rounded border-zinc-400 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
            <div className="flex items-start px-1 text-sm w-full">
              <div
                aria-hidden="true"
                className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700"
              >
                {Array.from({
                  length: text.split("\n").length,
                }).map((_, index) => (
                  <Fragment key={index}>
                    {(index + 1).toString().padStart(2, "0")}
                    <br />
                  </Fragment>
                ))}
              </div>

              <textarea
                id="text"
                name="text"
                value={text}
                minLength={1}
                onChange={(e) => setText(e.target.value)}
                rows={Math.max(10, text.split("\n").length)}
                placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
                className="w-full p-0 text-base bg-transparent border-0 appearance-none resize-none hover:resize text-zinc-600 focus:outline-none placeholder-zinc-500 focus:ring-0 sm:text-sm"
              />
            </div>
          </pre>
          {/* <div className="my-7 w-full flex justify-center items-center">
            <Button>
              <label
                htmlFor="dropzone-file"
                className="flex items-center cursor-pointer"
              >
                <Icons.upload className="mr-2 h-4 w-4" />
                Upload a file
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files![0];
                    if (file.size > 1024 * 16) {
                      setError("File size limit: 16KB");
                      return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const t = e.target!.result as string;
                      setText(t);
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
            </Button>
          </div> */}

          <div className="my-7 w-full flex flex-col sm:flex-row justify-center items-center">
            <div className="w-full sm:w-1/5">
              <label
                className="flex items-center justify-center h-[58px] px-3 py-2 text-sm whitespace-no-wrap duration-150 border rounded border-zinc-400 sm:mr-2 mb-2 sm:mb-0 text-zinc-600 focus:border-zinc-100/80 focus:ring-0 hover:cursor-pointer "
                htmlFor="file_input"
              >
                Upload a file
              </label>
              <input
                className="hidden"
                id="file_input"
                type="file"
                onChange={(e) => {
                  const file = e.target.files![0];
                  if (file.size > 1024 * 16) {
                    setError("File size must be less than 16kb");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const t = e.target!.result as string;
                    setText(t);
                  };
                  reader.readAsText(file);
                }}
              />
            </div>

            <div className="w-full h-13 px-3 py-2 mb-2 sm:mb-0 sm:mr-1 duration-150 border rounded sm:w-2/5 border-zinc-400 focus-within:ring-0">
              <label
                htmlFor="reads"
                className="block text-xs font-medium text-zinc-400 text-left"
              >
                READS
              </label>
              <input
                type="number"
                name="reads"
                id="reads"
                className="w-full p-0 text-base bg-transparent border-0 appearance-none text-zinc-600 placeholder-zinc-500 focus:ring-0 focus:outline-0 sm:text-sm"
                value={reads}
                onChange={(e) => setReads(e.target.valueAsNumber)}
              />
            </div>

            <div className="relative w-full h-13 sm:ml-1 px-3 py-2 duration-150 border rounded sm:w-2/5 border-zinc-400 focus-within:ring-0 ">
              <label
                htmlFor="reads"
                className="block text-xs text-left font-medium text-zinc-400"
              >
                TTL
              </label>
              <input
                type="number"
                name="reads"
                id="reads"
                className="w-full p-0 text-base bg-transparent border-0 appearance-none text-zinc-500 placeholder-zinc-500 focus:ring-0 focus:outline-0 sm:text-sm"
                value={ttl}
                onChange={(e) => setTtl(e.target.valueAsNumber)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="ttlMultiplier" className="sr-only" />
                <select
                  id="ttlMultiplier"
                  name="ttlMultiplier"
                  className="h-full py-0 pl-2 mr-2 bg-transparent border-0 border-transparent rounded pr-7 text-zinc-500 focus:ring-0 sm:text-sm"
                  onChange={(e) => setTtlMultiplier(parseInt(e.target.value))}
                  defaultValue={60 * 60 * 24}
                >
                  <option value={60}>{ttl === 1 ? "Minute" : "Minutes"}</option>
                  <option value={60 * 60}>
                    {ttl === 1 ? "Hour" : "Hours"}
                  </option>
                  <option value={60 * 60 * 24}>
                    {ttl === 1 ? "Day" : "Days"}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-2/4 mx-auto">
            <Button classes="w-full flex items-center justify-center">
              <Icons.share className="mr-2 h-4 w-4" />
              Share secret
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
